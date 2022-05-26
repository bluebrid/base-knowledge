/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)
 
  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  this.log(`挂载${el ? '根组件': `子组件${options._parentVnode.tag}`}`)
  if (!options.render) { // if 分支就是为了生成一个render 函数
    /**
     * src\platforms\web\entry-runtime-with-compiler.js
     * 1， 如果没有设置render 属性，就会进入到这个分支，然后去创建render方法， 根组件一般都是这样处理的，
     * 2， 如果没有render 属性，就要设置template
     * 3, 通过template 去生成render 函数
     */
    // 只有根组件才会进入这个分支
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }
      /**
       * 非常重要的一个方法，将template 字符串转换成render函数 \vue\src\compiler\index.js createCompiler
       */
      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      this.log(`生成根组件的render 函数` )
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  } else {
    // render function demo 
    /*
    var getChildrenTextContent = function (children) {
      return children.map(function (node) {
        return node.children
          ? getChildrenTextContent(node.children)
          : node.text
      }).join('')
    }

    Vue.component('anchored-heading', {
      render: function (createElement) {
        // create kebabCase id
        var headingId = getChildrenTextContent(this.$slots.default)
          .toLowerCase()
          .replace(/\W+/g, '-')
          .replace(/(^\-|\-$)/g, '')

        return createElement(
          'h' + this.level,
          [
            createElement('a', {
              attrs: {
                name: headingId,
                href: '#' + headingId
              }
            }, this.$slots.default)
          ]
        )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    })
    */
  
  }
  /**
   *.\vuelib\vue\src\platforms\web\runtime\index.js
   *  Vue.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating);
  };
   */
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
