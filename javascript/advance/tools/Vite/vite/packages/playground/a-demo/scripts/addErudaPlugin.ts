export const AddErudaPlugin = {
    name: 'pre-transform',
    desc: '添加Eruda插件',
    transformIndexHtml: {
        enforce: 'pre',
        transform() {
            return [
                {
                    tag: 'div',
                    attrs: { id: 'eruda' },
                    injectTo: 'body'
                },
                {
                    tag: 'script',
                    attrs: { src: '/assets/eruda.js' },
                    injectTo: 'body'
                },
                {
                    tag: 'script',
                    attrs: { src: 'assets/eruda.ts', type: "module" },
                    injectTo: 'body'
                }
            ]
        }
    }
}