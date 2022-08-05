import fs from 'fs'
const fileTypes = ['index.css', 'index.sass', 'index.less', 'index.scss', 'index.styl', 'assets/common.scss']
export const AddStylesPlugin = {
  name: 'pre-transform',
  desc: '添加Style',
  transformIndexHtml: {
    enforce: 'pre',
    transform() {
      return fileTypes.reduce((items, file) => {
        if (fs.existsSync(file)) {
          const style = {
            tag: 'link',
            attrs: { rel: 'stylesheet', href: file },
            injectTo: 'head'
          }
          items.push(style)
        }
        return items
      }, [] as Array<any>)
    }
  }
}