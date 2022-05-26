---
title: Configuring Vite
---

# Configuring Vite

## Config File

### Config File Resolving

When running `vite` from the command line, Vite will automatically try to resolve a config file named `vite.config.js` inside [project root](/guide/#index-html-and-project-root).

The most basic config file looks like this:

```js
// vite.config.js
export default {
  // config options
}
```

Note Vite supports using ES modules syntax in the config file even if the project is not using native Node ESM via `type: "module"`. In this case, the config file is auto pre-processed before load.

You can also explicitly specify a config file to use with the `--config` CLI option (resolved relative to `cwd`):

```bash
vite --config my-config.js
```

::: tip NOTE
Vite will replace `__filename`, `__dirname`, and `import.meta.url` in config files and its deps. Using these as variable names will result in an error:

```js
const __filename = "value"
// will be transformed to
const "path/vite.config.js" = "value"
```

:::

### Config Intellisense

Since Vite ships with TypeScript typings, you can leverage your IDE's intellisense with jsdoc type hints:

```js
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  // ...
}

export default config
```

Alternatively, you can use the `defineConfig` helper which should provide intellisense without the need for jsdoc annotations:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

Vite also directly supports TS config files. You can use `vite.config.ts` with the `defineConfig` helper as well.

### Conditional Config

If the config needs to conditional determine options based on the command (`dev`/`serve` or `build`) or the [mode](/guide/env-and-mode) being used, it can export a function instead:

```js
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // dev specific config
    }
  } else {
    // command === 'build'
    return {
      // build specific config
    }
  }
})
```

It is important to note that in Vite's API the `command` value is `serve` during dev (in the cli `vite`, `vite dev`, and `vite serve` are aliases), and `build` when building for production (`vite build`).

### Async Config

If the config needs to call async function, it can export a async function instead:

```js
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite config
  }
})
```

### Environment Variables

Environmental Variables can be obtained from `process.env` as usual.

Note that Vite doesn't load `.env` files by default as the files to load can only be determined after evaluating the Vite config, for example, the `root` and `envDir` options affects the loading behaviour. However, you can use the exported `loadEnv` helper to load the specific `.env` file if needed.

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV
    }
  }
})
```

## Shared Options

### root

- **Type:** `string`
- **Default:** `process.cwd()`

  Project root directory (where `index.html` is located). Can be an absolute path, or a path relative to the location of the config file itself.

  See [Project Root](/guide/#index-html-and-project-root) for more details.

### base

- **Type:** `string`
- **Default:** `/`

  Base public path when served in development or production. Valid values include:

  - Absolute URL pathname, e.g. `/foo/`
  - Full URL, e.g. `https://foo.com/`
  - Empty string or `./` (for embedded deployment)

  See [Public Base Path](/guide/build#public-base-path) for more details.

### mode

- **Type:** `string`
- **Default:** `'development'` for serve, `'production'` for build

  Specifying this in config will override the default mode for **both serve and build**. This value can also be overridden via the command line `--mode` option.

  See [Env Variables and Modes](/guide/env-and-mode) for more details.

### define

- **Type:** `Record<string, string>`

  Define global constant replacements. Entries will be defined as globals during dev and statically replaced during build.

  - Starting from `2.0.0-beta.70`, string values will be used as raw expressions, so if defining a string constant, it needs to be explicitly quoted (e.g. with `JSON.stringify`).

  - To be consistent with [esbuild behavior](https://esbuild.github.io/api/#define), expressions must either be a JSON object (null, boolean, number, string, array, or object) or a single identifier.

  - Replacements are performed only when the match is surrounded by word boundaries (`\b`).

  ::: warning
  Because it's implemented as straightforward text replacements without any syntax analysis, we recommend using `define` for CONSTANTS only.

  For example, `process.env.FOO` and `__APP_VERSION__` are good fits. But `process` or `global` should not be put into this option. Variables can be shimmed or polyfilled instead.
  :::

  ::: tip NOTE
  For TypeScript users, make sure to add the type declarations in the `env.d.ts` or `vite-env.d.ts` file to get type checks and Intellisense.

  Example:

  ```ts
  // vite-env.d.ts
  declare const __APP_VERSION__: string
  ```

  :::

### plugins

- **Type:** `(Plugin | Plugin[])[]`

  Array of plugins to use. Falsy plugins are ignored and arrays of plugins are flattened. See [Plugin API](/guide/api-plugin) for more details on Vite plugins.

### publicDir

- **Type:** `string | false`
- **Default:** `"public"`

  Directory to serve as plain static assets. Files in this directory are served at `/` during dev and copied to the root of `outDir` during build, and are always served or copied as-is without transform. The value can be either an absolute file system path or a path relative to project root.

  Defining `publicDir` as `false` disables this feature.

  See [The `public` Directory](/guide/assets#the-public-directory) for more details.

### cacheDir

- **Type:** `string`
- **Default:** `"node_modules/.vite"`

  Directory to save cache files. Files in this directory are pre-bundled deps or some other cache files generated by vite, which can improve the performance. You can use `--force` flag or manually delete the directory to regenerate the cache files. The value can be either an absolute file system path or a path relative to project root. Default to `.vite` when no package.json is detected.

### resolve.alias

- **Type:**
  `Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>`

  Will be passed to `@rollup/plugin-alias` as its [entries option](https://github.com/rollup/plugins/tree/master/packages/alias#entries). Can either be an object, or an array of `{ find, replacement, customResolver }` pairs.

  When aliasing to file system paths, always use absolute paths. Relative alias values will be used as-is and will not be resolved into file system paths.

  More advanced custom resolution can be achieved through [plugins](/guide/api-plugin).

### resolve.dedupe

- **Type:** `string[]`

  If you have duplicated copies of the same dependency in your app (likely due to hoisting or linked packages in monorepos), use this option to force Vite to always resolve listed dependencies to the same copy (from project root).

  :::warning SSR + ESM
  For SSR builds, deduplication does not work for ESM build outputs configured from `build.rollupOptions.output`. A workaround is to use CJS build outputs until ESM has better plugin support for module loading.
  :::

### resolve.conditions

- **Type:** `string[]`

  Additional allowed conditions when resolving [Conditional Exports](https://nodejs.org/api/packages.html#packages_conditional_exports) from a package.

  A package with conditional exports may have the following `exports` field in its `package.json`:

  ```json
  {
    "exports": {
      ".": {
        "import": "./index.esm.js",
        "require": "./index.cjs.js"
      }
    }
  }
  ```

  Here, `import` and `require` are "conditions". Conditions can be nested and should be specified from most specific to least specific.

  Vite has a list of "allowed conditions" and will match the first condition that is in the allowed list. The default allowed conditions are: `import`, `module`, `browser`, `default`, and `production/development` based on current mode. The `resolve.conditions` config option allows specifying additional allowed conditions.

  :::warning Resolving subpath exports
  Export keys ending with "/" is deprecated by Node and may not work well. Please contact the package author to use [`*` subpath patterns](https://nodejs.org/api/packages.html#package-entry-points) instead.
  :::

### resolve.mainFields

- **Type:** `string[]`
- **Default:** `['module', 'jsnext:main', 'jsnext']`

  List of fields in `package.json` to try when resolving a package's entry point. Note this takes lower precedence than conditional exports resolved from the `exports` field: if an entry point is successfully resolved from `exports`, the main field will be ignored.

### resolve.extensions

- **Type:** `string[]`
- **Default:** `['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']`

  List of file extensions to try for imports that omit extensions. Note it is **NOT** recommended to omit extensions for custom import types (e.g. `.vue`) since it can interfere with IDE and type support.

### resolve.preserveSymlinks

- **Type:** `boolean`
- **Default:** `false`

  Enabling this setting causes vite to determine file identity by the original file path (i.e. the path without following symlinks) instead of the real file path (i.e. the path after following symlinks).

- **Related:** [esbuild#preserve-symlinks](https://esbuild.github.io/api/#preserve-symlinks), [webpack#resolve.symlinks
  ](https://webpack.js.org/configuration/resolve/#resolvesymlinks)

### css.modules

- **Type:**

  ```ts
  interface CSSModulesOptions {
    scopeBehaviour?: 'global' | 'local'
    globalModulePaths?: RegExp[]
    generateScopedName?:
      | string
      | ((name: string, filename: string, css: string) => string)
    hashPrefix?: string
    /**
     * default: null
     */
    localsConvention?:
      | 'camelCase'
      | 'camelCaseOnly'
      | 'dashes'
      | 'dashesOnly'
      | null
  }
  ```

  Configure CSS modules behavior. The options are passed on to [postcss-modules](https://github.com/css-modules/postcss-modules).

### css.postcss

- **Type:** `string | (postcss.ProcessOptions & { plugins?: postcss.Plugin[] })`

  Inline PostCSS config or a custom directory to search PostCSS config from (default is project root).

  For inline PostCSS config, it expects the same format as `postcss.config.js`. But for `plugins` property, only [array format](https://github.com/postcss/postcss-load-config/blob/main/README.md#array) can be used.

  The search is done using [postcss-load-config](https://github.com/postcss/postcss-load-config) and only the supported config file names are loaded.

  Note if an inline config is provided, Vite will not search for other PostCSS config sources.

### css.preprocessorOptions

- **Type:** `Record<string, object>`

  Specify options to pass to CSS pre-processors. The file extensions are used as keys for the options. Example:

  ```js
  export default defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `$injectedColor: orange;`
        },
        styl: {
          additionalData: `$injectedColor ?= orange`
        }
      }
    }
  })
  ```

### css.devSourcemap

- **Experimental**
- **Type:** `boolean`
- **Default:** `false`

  Whether to enable sourcemaps during dev.

### json.namedExports

- **Type:** `boolean`
- **Default:** `true`

  Whether to support named imports from `.json` files.

### json.stringify

- **Type:** `boolean`
- **Default:** `false`

  If set to `true`, imported JSON will be transformed into `export default JSON.parse("...")` which is significantly more performant than Object literals, especially when the JSON file is large.

  Enabling this disables named imports.

### esbuild

- **Type:** `ESBuildOptions | false`

  `ESBuildOptions` extends [esbuild's own transform options](https://esbuild.github.io/api/#transform-api). The most common use case is customizing JSX:

  ```js
  export default defineConfig({
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    }
  })
  ```

  By default, esbuild is applied to `ts`, `jsx` and `tsx` files. You can customize this with `esbuild.include` and `esbuild.exclude`, which can be a regex, a [picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern, or an array of either.

  In addition, you can also use `esbuild.jsxInject` to automatically inject JSX helper imports for every file transformed by esbuild:

  ```js
  export default defineConfig({
    esbuild: {
      jsxInject: `import React from 'react'`
    }
  })
  ```

  Set to `false` to disable esbuild transforms.

### assetsInclude

- **Type:** `string | RegExp | (string | RegExp)[]`
- **Related:** [Static Asset Handling](/guide/assets)

  Specify additional [picomatch patterns](https://github.com/micromatch/picomatch#globbing-features) to be treated as static assets so that:

  - They will be excluded from the plugin transform pipeline when referenced from HTML or directly requested over `fetch` or XHR.

  - Importing them from JS will return their resolved URL string (this can be overwritten if you have a `enforce: 'pre'` plugin to handle the asset type differently).

  The built-in asset type list can be found [here](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts).

  **Example:**

  ```js
  export default defineConfig({
    assetsInclude: ['**/*.gltf']
  })
  ```

### logLevel

- **Type:** `'info' | 'warn' | 'error' | 'silent'`

  Adjust console output verbosity. Default is `'info'`.

### clearScreen

- **Type:** `boolean`
- **Default:** `true`

  Set to `false` to prevent Vite from clearing the terminal screen when logging certain messages. Via command line, use `--clearScreen false`.

### envDir

- **Type:** `string`
- **Default:** `root`

  The directory from which `.env` files are loaded. Can be an absolute path, or a path relative to the project root.

  See [here](/guide/env-and-mode#env-files) for more about environment files.

### envPrefix

- **Type:** `string | string[]`
- **Default:** `VITE_`

  Env variables starts with `envPrefix` will be exposed to your client source code via import.meta.env.

  :::warning SECURITY NOTES
  `envPrefix` should not be set as `''`, which will expose all your env variables and cause unexpected leaking of of sensitive information. Vite will throw error when detecting `''`.
  :::

## Server Options

### server.host

- **Type:** `string | boolean`
- **Default:** `'127.0.0.1'`

  Specify which IP addresses the server should listen on.
  Set this to `0.0.0.0` or `true` to listen on all addresses, including LAN and public addresses.

  This can be set via the CLI using `--host 0.0.0.0` or `--host`.

### server.port

- **Type:** `number`
- **Default:** `3000`

  Specify server port. Note if the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on.

### server.strictPort

- **Type:** `boolean`

  Set to `true` to exit if port is already in use, instead of automatically try the next available port.

### server.https

- **Type:** `boolean | https.ServerOptions`

  Enable TLS + HTTP/2. Note this downgrades to TLS only when the [`server.proxy` option](#server-proxy) is also used.

  The value can also be an [options object](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) passed to `https.createServer()`.

### server.open

- **Type:** `boolean | string`

  Automatically open the app in the browser on server start. When the value is a string, it will be used as the URL's pathname. If you want to open the server in a specific browser you like, you can set the env `process.env.BROWSER` (e.g. `firefox`). See [the `open` package](https://github.com/sindresorhus/open#app) for more details.

  **Example:**

  ```js
  export default defineConfig({
    server: {
      open: '/docs/index.html'
    }
  })
  ```

### server.proxy

- **Type:** `Record<string, string | ProxyOptions>`

  Configure custom proxy rules for the dev server. Expects an object of `{ key: options }` pairs. If the key starts with `^`, it will be interpreted as a `RegExp`. The `configure` option can be used to access the proxy instance.

  Uses [`http-proxy`](https://github.com/http-party/node-http-proxy). Full options [here](https://github.com/http-party/node-http-proxy#options).

  **Example:**

  ```js
  export default defineConfig({
    server: {
      proxy: {
        // string shorthand
        '/foo': 'http://localhost:4567',
        // with options
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // with RegEx
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, '')
        },
        // Using the proxy instance
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          configure: (proxy, options) => {
            // proxy will be an instance of 'http-proxy'
          }
        },
        // Proxying websockets or socket.io
        '/socket.io': {
          target: 'ws://localhost:3000',
          ws: true
        }
      }
    }
  })
  ```

### server.cors

- **Type:** `boolean | CorsOptions`

  Configure CORS for the dev server. This is enabled by default and allows any origin. Pass an [options object](https://github.com/expressjs/cors) to fine tune the behavior or `false` to disable.

### server.headers

- **Type:** `OutgoingHttpHeaders`

  Specify server response headers.

### server.force

- **Type:** `boolean`
- **Related:** [Dependency Pre-Bundling](/guide/dep-pre-bundling)

  Set to `true` to force dependency pre-bundling.

### server.hmr

- **Type:** `boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }`

  Disable or configure HMR connection (in cases where the HMR websocket must use a different address from the http server).

  Set `server.hmr.overlay` to `false` to disable the server error overlay.

  `clientPort` is an advanced option that overrides the port only on the client side, allowing you to serve the websocket on a different port than the client code looks for it on. Useful if you're using an SSL proxy in front of your dev server.

  If specifying `server.hmr.server`, Vite will process HMR connection requests through the provided server. If not in middleware mode, Vite will attempt to process HMR connection requests through the existing server. This can be helpful when using self-signed certificates or when you want to expose Vite over a network on a single port.

### server.watch

- **Type:** `object`

  File system watcher options to pass on to [chokidar](https://github.com/paulmillr/chokidar#api).

  When running Vite on Windows Subsystem for Linux (WSL) 2, if the project folder resides in a Windows filesystem, you'll need to set this option to `{ usePolling: true }`. This is due to [a WSL2 limitation](https://github.com/microsoft/WSL/issues/4739) with the Windows filesystem.

  The Vite server watcher skips `.git/` and `node_modules/` directories by default. If you want to watch a package inside `node_modules/`, you can pass a negated glob pattern to `server.watch.ignored`. That is:

  ```js
  export default defineConfig({
    server: {
      watch: {
        ignored: ['!**/node_modules/your-package-name/**']
      }
    },
    // The watched package must be excluded from optimization,
    // so that it can appear in the dependency graph and trigger hot reload.
    optimizeDeps: {
      exclude: ['your-package-name']
    }
  })
  ```

### server.middlewareMode

- **Type:** `'ssr' | 'html'`

  Create Vite server in middleware mode. (without a HTTP server)

  - `'ssr'` will disable Vite's own HTML serving logic so that you should serve `index.html` manually.
  - `'html'` will enable Vite's own HTML serving logic.

- **Related:** [SSR - Setting Up the Dev Server](/guide/ssr#setting-up-the-dev-server)

- **Example:**

```js
const express = require('express')
const { createServer: createViteServer } = require('vite')

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode.
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    // If `middlewareMode` is `'ssr'`, should serve `index.html` here.
    // If `middlewareMode` is `'html'`, there is no need to serve `index.html`
    // because Vite will do that.
  })
}

createServer()
```

### server.base

- **Type:** `string | undefined`

  Prepend this folder to http requests, for use when proxying vite as a subfolder. Should start and end with the `/` character.

### server.fs.strict

- **Type:** `boolean`
- **Default:** `true` (enabled by default since Vite 2.7)

  Restrict serving files outside of workspace root.

### server.fs.allow

- **Type:** `string[]`

  Restrict files that could be served via `/@fs/`. When `server.fs.strict` is set to `true`, accessing files outside this directory list that aren't imported from an allowed file will result in a 403.

  Vite will search for the root of the potential workspace and use it as default. A valid workspace met the following conditions, otherwise will fallback to the [project root](/guide/#index-html-and-project-root).

  - contains `workspaces` field in `package.json`
  - contains one of the following file
    - `lerna.json`
    - `pnpm-workspace.yaml`

  Accepts a path to specify the custom workspace root. Could be a absolute path or a path relative to [project root](/guide/#index-html-and-project-root). For example:

  ```js
  export default defineConfig({
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..']
      }
    }
  })
  ```

  When `server.fs.allow` is specified, the auto workspace root detection will be disabled. To extend the original behavior, a utility `searchForWorkspaceRoot` is exposed:

  ```js
  import { defineConfig, searchForWorkspaceRoot } from 'vite'

  export default defineConfig({
    server: {
      fs: {
        allow: [
          // search up for workspace root
          searchForWorkspaceRoot(process.cwd()),
          // your custom rules
          '/path/to/custom/allow'
        ]
      }
    }
  })
  ```

### server.fs.deny

- **Experimental**
- **Type:** `string[]`

  Blocklist for sensitive files being restricted to be served by Vite dev server.

  Default to `['.env', '.env.*', '*.{pem,crt}']`.

### server.origin

- **Type:** `string`

Defines the origin of the generated asset URLs during development.

```js
export default defineConfig({
  server: {
    origin: 'http://127.0.0.1:8080'
  }
})
```

## Build Options

### build.target

- **Type:** `string | string[]`
- **Default:** `'modules'`
- **Related:** [Browser Compatibility](/guide/build#browser-compatibility)

  Browser compatibility target for the final bundle. The default value is a Vite special value, `'modules'`, which targets [browsers with native ES module support](https://caniuse.com/es6-module).

  Another special value is `'esnext'` - which assumes native dynamic imports support and will transpile as little as possible:

  - If the [`build.minify`](#build-minify) option is `'terser'`, `'esnext'` will be forced down to `'es2019'`.
  - In other cases, it will perform no transpilation at all.

  The transform is performed with esbuild and the value should be a valid [esbuild target option](https://esbuild.github.io/api/#target). Custom targets can either be a ES version (e.g. `es2015`), a browser with version (e.g. `chrome58`), or an array of multiple target strings.

  Note the build will fail if the code contains features that cannot be safely transpiled by esbuild. See [esbuild docs](https://esbuild.github.io/content-types/#javascript) for more details.

### build.polyfillModulePreload

- **Type:** `boolean`
- **Default:** `true`

  Whether to automatically inject [module preload polyfill](https://guybedford.com/es-module-preloading-integrity#modulepreload-polyfill).

  If set to `true`, the polyfill is auto injected into the proxy module of each `index.html` entry. If the build is configured to use a non-html custom entry via `build.rollupOptions.input`, then it is necessary to manually import the polyfill in your custom entry:

  ```js
  import 'vite/modulepreload-polyfill'
  ```

  Note: the polyfill does **not** apply to [Library Mode](/guide/build#library-mode). If you need to support browsers without native dynamic import, you should probably avoid using it in your library.

### build.outDir

- **Type:** `string`
- **Default:** `dist`

  Specify the output directory (relative to [project root](/guide/#index-html-and-project-root)).

### build.assetsDir

- **Type:** `string`
- **Default:** `assets`

  Specify the directory to nest generated assets under (relative to `build.outDir`).

### build.assetsInlineLimit

- **Type:** `number`
- **Default:** `4096` (4kb)

  Imported or referenced assets that are smaller than this threshold will be inlined as base64 URLs to avoid extra http requests. Set to `0` to disable inlining altogether.

  ::: tip Note
  If you specify `build.lib`, `build.assetsInlineLimit` will be ignored and assets will always be inlined, regardless of file size.
  :::

### build.cssCodeSplit

- **Type:** `boolean`
- **Default:** `true`

  Enable/disable CSS code splitting. When enabled, CSS imported in async chunks will be inlined into the async chunk itself and inserted when the chunk is loaded.

  If disabled, all CSS in the entire project will be extracted into a single CSS file.

  ::: tip Note
  If you specify `build.lib`, `build.cssCodeSplit` will be `false` as default.
  :::

### build.cssTarget

- **Type:** `string | string[]`
- **Default:** the same as [`build.target`](/config/#build-target)

  This options allows users to set a different browser target for CSS minification from the one used for JavaScript transpilation.

  It should only be used when you are targeting a non-mainstream browser.
  One example is Android WeChat WebView, which supports most modern JavaScript features but not the [`#RGBA` hexadecimal color notation in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb_colors).
  In this case, you need to set `build.cssTarget` to `chrome61` to prevent vite from transform `rgba()` colors into `#RGBA` hexadecimal notations.

### build.sourcemap

- **Type:** `boolean | 'inline' | 'hidden'`
- **Default:** `false`

  Generate production source maps. If `true`, a separate sourcemap file will be created. If `'inline'`, the sourcemap will be appended to the resulting output file as a data URI. `'hidden'` works like `true` except that the corresponding sourcemap comments in the bundled files are suppressed.

### build.rollupOptions

- **Type:** [`RollupOptions`](https://rollupjs.org/guide/en/#big-list-of-options)

  Directly customize the underlying Rollup bundle. This is the same as options that can be exported from a Rollup config file and will be merged with Vite's internal Rollup options. See [Rollup options docs](https://rollupjs.org/guide/en/#big-list-of-options) for more details.

### build.commonjsOptions

- **Type:** [`RollupCommonJSOptions`](https://github.com/rollup/plugins/tree/master/packages/commonjs#options)

  Options to pass on to [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs).

### build.dynamicImportVarsOptions

- **Type:** [`RollupDynamicImportVarsOptions`](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#options)

  Options to pass on to [@rollup/plugin-dynamic-import-vars](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars).

### build.lib

- **Type:** `{ entry: string, name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[], fileName?: string | ((format: ModuleFormat) => string) }`
- **Related:** [Library Mode](/guide/build#library-mode)

  Build as a library. `entry` is required since the library cannot use HTML as entry. `name` is the exposed global variable and is required when `formats` includes `'umd'` or `'iife'`. Default `formats` are `['es', 'umd']`. `fileName` is the name of the package file output, default `fileName` is the name option of package.json, it can also be defined as function taking the `format` as an argument.

### build.manifest

- **Type:** `boolean | string`
- **Default:** `false`
- **Related:** [Backend Integration](/guide/backend-integration)

  When set to `true`, the build will also generate a `manifest.json` file that contains a mapping of non-hashed asset filenames to their hashed versions, which can then be used by a server framework to render the correct asset links. When the value is a string, it will be used as the manifest file name.

### build.ssrManifest

- **Type:** `boolean | string`
- **Default:** `false`
- **Related:** [Server-Side Rendering](/guide/ssr)

  When set to `true`, the build will also generate a SSR manifest for determining style links and asset preload directives in production. When the value is a string, it will be used as the manifest file name.

### build.ssr

- **Type:** `boolean | string`
- **Default:** `undefined`
- **Related:** [Server-Side Rendering](/guide/ssr)

  Produce SSR-oriented build. The value can be a string to directly specify the SSR entry, or `true`, which requires specifying the SSR entry via `rollupOptions.input`.

### build.minify

- **Type:** `boolean | 'terser' | 'esbuild'`
- **Default:** `'esbuild'`

  Set to `false` to disable minification, or specify the minifier to use. The default is [esbuild](https://github.com/evanw/esbuild) which is 20 ~ 40x faster than terser and only 1 ~ 2% worse compression. [Benchmarks](https://github.com/privatenumber/minification-benchmarks)

  Note the `build.minify` option is not available when using the `'es'` format in lib mode.

### build.terserOptions

- **Type:** `TerserOptions`

  Additional [minify options](https://terser.org/docs/api-reference#minify-options) to pass on to Terser.

### build.write

- **Type:** `boolean`
- **Default:** `true`

  Set to `false` to disable writing the bundle to disk. This is mostly used in [programmatic `build()` calls](/guide/api-javascript#build) where further post processing of the bundle is needed before writing to disk.

### build.emptyOutDir

- **Type:** `boolean`
- **Default:** `true` if `outDir` is inside `root`

  By default, Vite will empty the `outDir` on build if it is inside project root. It will emit a warning if `outDir` is outside of root to avoid accidentally removing important files. You can explicitly set this option to suppress the warning. This is also available via command line as `--emptyOutDir`.

### build.reportCompressedSize

- **Type:** `boolean`
- **Default:** `true`

  Enable/disable gzip-compressed size reporting. Compressing large output files can be slow, so disabling this may increase build performance for large projects.

### build.chunkSizeWarningLimit

- **Type:** `number`
- **Default:** `500`

  Limit for chunk size warnings (in kbs).

### build.watch

- **Type:** [`WatcherOptions`](https://rollupjs.org/guide/en/#watch-options)`| null`
- **Default:** `null`

  Set to `{}` to enable rollup watcher. This is mostly used in cases that involve build-only plugins or integrations processes.

## Preview Options

### preview.host

- **Type:** `string | boolean`
- **Default:** [`server.host`](#server_host)

  Specify which IP addresses the server should listen on.
  Set this to `0.0.0.0` or `true` to listen on all addresses, including LAN and public addresses.

  This can be set via the CLI using `--host 0.0.0.0` or `--host`.

### preview.port

- **Type:** `number`
- **Default:** `4173`

  Specify server port. Note if the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on.

**Example:**

```js
export default defineConfig({
  server: {
    port: 3030
  },
  preview: {
    port: 8080
  }
})
```

### preview.strictPort

- **Type:** `boolean`
- **Default:** [`server.strictPort`](#server_strictport)

  Set to `true` to exit if port is already in use, instead of automatically try the next available port.

### preview.https

- **Type:** `boolean | https.ServerOptions`
- **Default:** [`server.https`](#server_https)

  Enable TLS + HTTP/2. Note this downgrades to TLS only when the [`server.proxy` option](#server-proxy) is also used.

  The value can also be an [options object](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) passed to `https.createServer()`.

### preview.open

- **Type:** `boolean | string`
- **Default:** [`server.open`](#server_open)

  Automatically open the app in the browser on server start. When the value is a string, it will be used as the URL's pathname. If you want to open the server in a specific browser you like, you can set the env `process.env.BROWSER` (e.g. `firefox`). See [the `open` package](https://github.com/sindresorhus/open#app) for more details.

### preview.proxy

- **Type:** `Record<string, string | ProxyOptions>`
- **Default:** [`server.proxy`](#server_proxy)

  Configure custom proxy rules for the dev server. Expects an object of `{ key: options }` pairs. If the key starts with `^`, it will be interpreted as a `RegExp`. The `configure` option can be used to access the proxy instance.

  Uses [`http-proxy`](https://github.com/http-party/node-http-proxy). Full options [here](https://github.com/http-party/node-http-proxy#options).

### preview.cors

- **Type:** `boolean | CorsOptions`
- **Default:** [`server.cors`](#server_proxy)

  Configure CORS for the dev server. This is enabled by default and allows any origin. Pass an [options object](https://github.com/expressjs/cors) to fine tune the behavior or `false` to disable.

## Dep Optimization Options

- **Related:** [Dependency Pre-Bundling](/guide/dep-pre-bundling)

### optimizeDeps.entries

- **Type:** `string | string[]`

  By default, Vite will crawl all your `.html` files to detect dependencies that need to be pre-bundled (ignoring `node_modules`, `build.outDir`, `__tests__` and `coverage`). If `build.rollupOptions.input` is specified, Vite will crawl those entry points instead.

  If neither of these fit your needs, you can specify custom entries using this option - the value should be a [fast-glob pattern](https://github.com/mrmlnc/fast-glob#basic-syntax) or array of patterns that are relative from Vite project root. This will overwrite default entries inference. Only `node_modules` and `build.outDir` folders will be ignored by default when `optimizeDeps.entries` is explicitily defined. If other folders needs to be ignored, you can use an ignore pattern as part of the entries list, marked with an initial `!`.

### optimizeDeps.exclude

- **Type:** `string[]`

  Dependencies to exclude from pre-bundling.

  :::warning CommonJS
  CommonJS dependencies should not be excluded from optimization. If an ESM dependency is excluded from optimization, but has a nested CommonJS dependency, the CommonJS dependency should be added to `optimizeDeps.include`. Example:

  ```js
  export default defineConfig({
    optimizeDeps: {
      include: ['esm-dep > cjs-dep']
    }
  })
  ```

  :::

### optimizeDeps.include

- **Type:** `string[]`

  By default, linked packages not inside `node_modules` are not pre-bundled. Use this option to force a linked package to be pre-bundled.

### optimizeDeps.esbuildOptions

- **Type:** [`EsbuildBuildOptions`](https://esbuild.github.io/api/#simple-options)

  Options to pass to esbuild during the dep scanning and optimization.

  Certain options are omitted since changing them would not be compatible with Vite's dep optimization.

  - `external` is also omitted, use Vite's `optimizeDeps.exclude` option
  - `plugins` are merged with Vite's dep plugin
  - `keepNames` takes precedence over the deprecated `optimizeDeps.keepNames`

## SSR Options

:::warning Experimental
SSR options may be adjusted in minor releases.
:::

- **Related:** [SSR Externals](/guide/ssr#ssr-externals)

### ssr.external

- **Type:** `string[]`

  Force externalize dependencies for SSR.

### ssr.noExternal

- **Type:** `string | RegExp | (string | RegExp)[] | true`

  Prevent listed dependencies from being externalized for SSR. If `true`, no dependencies are externalized.

### ssr.target

- **Type:** `'node' | 'webworker'`
- **Default:** `node`

  Build target for the SSR server.

## Worker Options

### worker.format

- **Type:** `'es' | 'iife'`
- **Default:** `iife`

  Output format for worker bundle.

### worker.plugins

- **Type:** [`(Plugin | Plugin[])[]`](#plugins)

  Vite plugins that apply to worker bundle

### worker.rollupOptions

- **Type:** [`RollupOptions`](https://rollupjs.org/guide/en/#big-list-of-options)

  Rollup options to build worker bundle.
