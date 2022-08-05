/**
 *
 * @typedef {import('./markdownTransformerPlugin').PluginOptions} PluginOptions
 */
 const colors = require('picocolors');
const { markdownToHTML } = require("./markdown-to-html");
// import { load } from 'cheerio';
const load = require('cheerio').load
import fs from 'fs'
const path = require('path');
const createJSExports = ({ html, attributes }) => {
  const jsSrc = `
export const attributes = ${JSON.stringify(attributes)};
export const html = ${JSON.stringify(html)};
export default html;
`;

  return jsSrc;
};
function getShortName(file, root) {
  return file.startsWith(root + '/') ? path.posix.relative(root, file) : file;
}
/**
 *
 * @param {PluginOptions} pluginOptions
 */
const markdownTransformerPlugin = (pluginOptions) => {
  return {
    name: "vite-plugin-md-to-html",
    desc: 'markdown语法转换HTML',
    // handleHotUpdate({ file, server }) {
    //   if (file.endsWith('.md')) {
    //     server.config.logger.info(
    //       colors.green('page reload ') + colors.dim(getShortName(file, server.config.root)),
    //       { clear: true, timestamp: true }
    //     );
    //     server.ws.send({
    //       type: 'full-reload',
    //     });
    //     return [];
    //   }
    // },
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, { filename }) {
        let attributes
        const updatedHtml = html.replace(/<template.*?data-type="md".*?(\/>|<\/template>)/g, (matchedString) => {
          const [, rawTemplatePath] = matchedString.match(/data-src=["'](.*?)["']/) || [];

          if (!rawTemplatePath) {
            throw new Error(`Template path not specified for ${matchedString}`);
          }

          const entryFileDir = filename.replace(/(.*)\/.*\.html$/, '$1');
          const templateFilePath = path.join(entryFileDir, rawTemplatePath);
          const buffer = fs.readFileSync(templateFilePath)
          const source = buffer.toString();
          const res = markdownToHTML(source, pluginOptions);
          attributes = res.attributes
          return res.html
        });
        if (attributes) {
          const $ = load(updatedHtml);
          Object.keys(attributes).forEach(key => {
            $(key).text(attributes[key])
          })
          return $.html()
        }
        return updatedHtml;
      },
    },

    transform(source, id) {
      if (id.endsWith(".md")) {
        const { html, attributes } = markdownToHTML(source, pluginOptions);
        const jsSrc = createJSExports({ html, attributes });
        return { code: jsSrc };
      }
    },
  };
};

markdownTransformerPlugin.markdownTransformerPlugin = markdownTransformerPlugin;
module.exports = markdownTransformerPlugin;
