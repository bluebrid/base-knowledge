import MagicString from 'magic-string'
import type { SourceMap } from 'rollup'
import type { TransformResult } from '../server/transformRequest'
import { parser } from '../server/pluginContainer'
import type {
  Identifier,
  Node as _Node,
  Property,
  Function as FunctionNode,
  Pattern
} from 'estree'
import { extract_names as extractNames } from 'periscopic'
import { walk as eswalk } from 'estree-walker'
import { combineSourcemaps } from '../utils'
import type { RawSourceMap } from '@ampproject/remapping'

type Node = _Node & {
  start: number
  end: number
}

export const ssrModuleExportsKey = `__vite_ssr_exports__`
export const ssrImportKey = `__vite_ssr_import__`
export const ssrDynamicImportKey = `__vite_ssr_dynamic_import__`
export const ssrExportAllKey = `__vite_ssr_exportAll__`
export const ssrImportMetaKey = `__vite_ssr_import_meta__`

export async function ssrTransform(
  code: string,
  inMap: SourceMap | null,
  url: string
): Promise<TransformResult | null> {
  const s = new MagicString(code)

  let ast: any
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      ecmaVersion: 'latest',
      locations: true
    })
  } catch (err) {
    if (!err.loc || !err.loc.line) throw err
    const line = err.loc.line
    throw new Error(
      `Parse failure: ${err.message}\nContents of line ${line}: ${
        code.split('\n')[line - 1]
      }`
    )
  }

  let uid = 0
  const deps = new Set<string>()
  const dynamicDeps = new Set<string>()
  const idToImportMap = new Map<string, string>()
  const declaredConst = new Set<string>()

  function defineImport(node: Node, source: string) {
    deps.add(source)
    const importId = `__vite_ssr_import_${uid++}__`
    s.appendLeft(
      node.start,
      `const ${importId} = await ${ssrImportKey}(${JSON.stringify(source)});\n`
    )
    return importId
  }

  function defineExport(position: number, name: string, local = name) {
    s.appendLeft(
      position,
      `\nObject.defineProperty(${ssrModuleExportsKey}, "${name}", ` +
        `{ enumerable: true, configurable: true, get(){ return ${local} }});`
    )
  }

  // 1. check all import statements and record id -> importName map
  for (const node of ast.body as Node[]) {
    // import foo from 'foo' --> foo -> __import_foo__.default
    // import { baz } from 'foo' --> baz -> __import_foo__.baz
    // import * as ok from 'foo' --> ok -> __import_foo__
    if (node.type === 'ImportDeclaration') {
      const importId = defineImport(node, node.source.value as string)
      for (const spec of node.specifiers) {
        if (spec.type === 'ImportSpecifier') {
          idToImportMap.set(
            spec.local.name,
            `${importId}.${spec.imported.name}`
          )
        } else if (spec.type === 'ImportDefaultSpecifier') {
          idToImportMap.set(spec.local.name, `${importId}.default`)
        } else {
          // namespace specifier
          idToImportMap.set(spec.local.name, importId)
        }
      }
      s.remove(node.start, node.end)
    }
  }

  // 2. check all export statements and define exports
  for (const node of ast.body as Node[]) {
    // named exports
    if (node.type === 'ExportNamedDeclaration') {
      if (node.declaration) {
        if (
          node.declaration.type === 'FunctionDeclaration' ||
          node.declaration.type === 'ClassDeclaration'
        ) {
          // export function foo() {}
          defineExport(node.end, node.declaration.id!.name)
        } else {
          // export const foo = 1, bar = 2
          for (const declaration of node.declaration.declarations) {
            const names = extractNames(declaration.id as any)
            for (const name of names) {
              defineExport(node.end, name)
            }
          }
        }
        s.remove(node.start, (node.declaration as Node).start)
      } else {
        s.remove(node.start, node.end)
        if (node.source) {
          // export { foo, bar } from './foo'
          const importId = defineImport(node, node.source.value as string)
          for (const spec of node.specifiers) {
            defineExport(
              node.end,
              spec.exported.name,
              `${importId}.${spec.local.name}`
            )
          }
        } else {
          // export { foo, bar }
          for (const spec of node.specifiers) {
            const local = spec.local.name
            const binding = idToImportMap.get(local)
            defineExport(node.end, spec.exported.name, binding || local)
          }
        }
      }
    }

    // default export
    if (node.type === 'ExportDefaultDeclaration') {
      const expressionTypes = ['FunctionExpression', 'ClassExpression']
      if (
        'id' in node.declaration &&
        node.declaration.id &&
        !expressionTypes.includes(node.declaration.type)
      ) {
        // named hoistable/class exports
        // export default function foo() {}
        // export default class A {}
        const { name } = node.declaration.id
        s.remove(node.start, node.start + 15 /* 'export default '.length */)
        s.append(
          `\nObject.defineProperty(${ssrModuleExportsKey}, "default", ` +
            `{ enumerable: true, value: ${name} });`
        )
      } else {
        // anonymous default exports
        s.overwrite(
          node.start,
          node.start + 14 /* 'export default'.length */,
          `${ssrModuleExportsKey}.default =`,
          { contentOnly: true }
        )
      }
    }

    // export * from './foo'
    if (node.type === 'ExportAllDeclaration') {
      if (node.exported) {
        const importId = defineImport(node, node.source.value as string)
        s.remove(node.start, node.end)
        defineExport(node.end, node.exported.name, `${importId}`)
      } else {
        const importId = defineImport(node, node.source.value as string)
        s.remove(node.start, node.end)
        s.appendLeft(node.end, `${ssrExportAllKey}(${importId});`)
      }
    }
  }

  // 3. convert references to import bindings & import.meta references
  walk(ast, {
    onIdentifier(id, parent, parentStack) {
      const grandparent = parentStack[1]
      const binding = idToImportMap.get(id.name)
      if (!binding) {
        return
      }
      if (isStaticProperty(parent) && parent.shorthand) {
        // let binding used in a property shorthand
        // { foo } -> { foo: __import_x__.foo }
        // skip for destructuring patterns
        if (
          !isNodeInPatternWeakMap.get(parent) ||
          isInDestructuringAssignment(parent, parentStack)
        ) {
          s.appendLeft(id.end, `: ${binding}`)
        }
      } else if (
        (parent.type === 'PropertyDefinition' &&
          grandparent?.type === 'ClassBody') ||
        (parent.type === 'ClassDeclaration' && id === parent.superClass)
      ) {
        if (!declaredConst.has(id.name)) {
          declaredConst.add(id.name)
          // locate the top-most node containing the class declaration
          const topNode = parentStack[parentStack.length - 2]
          s.prependRight(topNode.start, `const ${id.name} = ${binding};\n`)
        }
      } else {
        s.overwrite(id.start, id.end, binding, { contentOnly: true })
      }
    },
    onImportMeta(node) {
      s.overwrite(node.start, node.end, ssrImportMetaKey, { contentOnly: true })
    },
    onDynamicImport(node) {
      s.overwrite(node.start, node.start + 6, ssrDynamicImportKey, {
        contentOnly: true
      })
      if (node.type === 'ImportExpression' && node.source.type === 'Literal') {
        dynamicDeps.add(node.source.value as string)
      }
    }
  })

  let map = s.generateMap({ hires: true })
  if (inMap && inMap.mappings && inMap.sources.length > 0) {
    map = combineSourcemaps(url, [
      {
        ...map,
        sources: inMap.sources,
        sourcesContent: inMap.sourcesContent
      } as RawSourceMap,
      inMap as RawSourceMap
    ]) as SourceMap
  } else {
    map.sources = [url]
    map.sourcesContent = [code]
  }

  return {
    code: s.toString(),
    map,
    deps: [...deps],
    dynamicDeps: [...dynamicDeps]
  }
}

interface Visitors {
  onIdentifier: (
    node: Identifier & {
      start: number
      end: number
    },
    parent: Node,
    parentStack: Node[]
  ) => void
  onImportMeta: (node: Node) => void
  onDynamicImport: (node: Node) => void
}

const isNodeInPatternWeakMap = new WeakMap<_Node, boolean>()

/**
 * Same logic from \@vue/compiler-core & \@vue/compiler-sfc
 * Except this is using acorn AST
 */
function walk(
  root: Node,
  { onIdentifier, onImportMeta, onDynamicImport }: Visitors
) {
  const parentStack: Node[] = []
  const scopeMap = new WeakMap<_Node, Set<string>>()
  const identifiers: [id: any, stack: Node[]][] = []

  const setScope = (node: FunctionNode, name: string) => {
    let scopeIds = scopeMap.get(node)
    if (scopeIds && scopeIds.has(name)) {
      return
    }
    if (!scopeIds) {
      scopeIds = new Set()
      scopeMap.set(node, scopeIds)
    }
    scopeIds.add(name)
  }

  function isInScope(name: string, parents: Node[]) {
    return parents.some((node) => node && scopeMap.get(node)?.has(name))
  }
  function handlePattern(p: Pattern, parentFunction: FunctionNode) {
    if (p.type === 'Identifier') {
      setScope(parentFunction, p.name)
    } else if (p.type === 'RestElement') {
      handlePattern(p.argument, parentFunction)
    } else if (p.type === 'ObjectPattern') {
      p.properties.forEach((property) => {
        if (property.type === 'RestElement') {
          setScope(parentFunction, (property.argument as Identifier).name)
        } else {
          handlePattern(property.value, parentFunction)
        }
      })
    } else if (p.type === 'ArrayPattern') {
      p.elements.forEach((element) => {
        if (element) {
          handlePattern(element, parentFunction)
        }
      })
    } else if (p.type === 'AssignmentPattern') {
      handlePattern(p.left, parentFunction)
    } else {
      setScope(parentFunction, (p as any).name)
    }
  }

  ;(eswalk as any)(root, {
    enter(node: Node, parent: Node | null) {
      if (node.type === 'ImportDeclaration') {
        return this.skip()
      }

      parent && parentStack.unshift(parent)

      if (node.type === 'MetaProperty' && node.meta.name === 'import') {
        onImportMeta(node)
      } else if (node.type === 'ImportExpression') {
        onDynamicImport(node)
      }

      if (node.type === 'Identifier') {
        if (
          !isInScope(node.name, parentStack) &&
          isRefIdentifier(node, parent!, parentStack)
        ) {
          // record the identifier, for DFS -> BFS
          identifiers.push([node, parentStack.slice(0)])
        }
      } else if (isFunction(node)) {
        // If it is a function declaration, it could be shadowing an import
        // Add its name to the scope so it won't get replaced
        if (node.type === 'FunctionDeclaration') {
          const parentFunction = findParentFunction(parentStack)
          if (parentFunction) {
            setScope(parentFunction, node.id!.name)
          }
        }
        // walk function expressions and add its arguments to known identifiers
        // so that we don't prefix them
        node.params.forEach((p) => {
          if (p.type === 'ObjectPattern' || p.type === 'ArrayPattern') {
            handlePattern(p, node)
            return
          }
          ;(eswalk as any)(p.type === 'AssignmentPattern' ? p.left : p, {
            enter(child: Node, parent: Node) {
              // skip params default value of destructure
              if (
                parent?.type === 'AssignmentPattern' &&
                parent?.right === child
              ) {
                return this.skip()
              }
              if (child.type !== 'Identifier') return
              // do not record as scope variable if is a destructuring keyword
              if (isStaticPropertyKey(child, parent)) return
              // do not record if this is a default value
              // assignment of a destructuring variable
              if (
                (parent?.type === 'TemplateLiteral' &&
                  parent?.expressions.includes(child)) ||
                (parent?.type === 'CallExpression' && parent?.callee === child)
              ) {
                return
              }
              setScope(node, child.name)
            }
          })
        })
      } else if (node.type === 'Property' && parent!.type === 'ObjectPattern') {
        // mark property in destructuring pattern
        isNodeInPatternWeakMap.set(node, true)
      } else if (node.type === 'VariableDeclarator') {
        const parentFunction = findParentFunction(parentStack)
        if (parentFunction) {
          handlePattern(node.id, parentFunction)
        }
      }
    },

    leave(node: Node, parent: Node | null) {
      parent && parentStack.shift()
    }
  })

  // emit the identifier events in BFS so the hoisted declarations
  // can be captured correctly
  identifiers.forEach(([node, stack]) => {
    if (!isInScope(node.name, stack)) onIdentifier(node, stack[0], stack)
  })
}

function isRefIdentifier(id: Identifier, parent: _Node, parentStack: _Node[]) {
  // declaration id
  if (
    parent.type === 'CatchClause' ||
    ((parent.type === 'VariableDeclarator' ||
      parent.type === 'ClassDeclaration') &&
      parent.id === id)
  ) {
    return false
  }

  if (isFunction(parent)) {
    // function declaration/expression id
    if ((parent as any).id === id) {
      return false
    }
    // params list
    if (parent.params.includes(id)) {
      return false
    }
  }

  // class method name
  if (parent.type === 'MethodDefinition' && !parent.computed) {
    return false
  }

  // property key
  // this also covers object destructuring pattern
  if (isStaticPropertyKey(id, parent) || isNodeInPatternWeakMap.get(parent)) {
    return false
  }

  // non-assignment array destructuring pattern
  if (
    parent.type === 'ArrayPattern' &&
    !isInDestructuringAssignment(parent, parentStack)
  ) {
    return false
  }

  // member expression property
  if (
    parent.type === 'MemberExpression' &&
    parent.property === id &&
    !parent.computed
  ) {
    return false
  }

  if (parent.type === 'ExportSpecifier') {
    return false
  }

  // is a special keyword but parsed as identifier
  if (id.name === 'arguments') {
    return false
  }

  return true
}

const isStaticProperty = (node: _Node): node is Property =>
  node && node.type === 'Property' && !node.computed

const isStaticPropertyKey = (node: _Node, parent: _Node) =>
  isStaticProperty(parent) && parent.key === node

function isFunction(node: _Node): node is FunctionNode {
  return /Function(?:Expression|Declaration)$|Method$/.test(node.type)
}

function findParentFunction(parentStack: _Node[]): FunctionNode | undefined {
  return parentStack.find((i) => isFunction(i)) as FunctionNode
}

function isInDestructuringAssignment(
  parent: _Node,
  parentStack: _Node[]
): boolean {
  if (
    parent &&
    (parent.type === 'Property' || parent.type === 'ArrayPattern')
  ) {
    return parentStack.some((i) => i.type === 'AssignmentExpression')
  }
  return false
}
