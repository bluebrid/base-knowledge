import fs from 'fs'
// const cheerio = require('cheerio');
const fileTypes = ['index.js', 'index.ts', 'index.coffee']
export const AddScriptsPlugin = {
    name: 'pre-transform',
    desc: '添加Script插件',
    transformIndexHtml: {
        enforce: 'pre',
        transform() {
            return fileTypes.reduce((items, file) => {
                if (fs.existsSync(file)) {
                    const style = {
                        tag: 'script',
                        attrs: { type: 'module', src: file },
                        injectTo: 'body'
                    }
                    items.push(style)
                }
                return items
            }, [] as Array<any>)
        }
    }
}