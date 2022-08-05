const path = require('path');
const colors = require('picocolors');
const { compileFile } = require('pug');

function getShortName(file, root) {
    return file.startsWith(root + '/') ? path.posix.relative(root, file) : file;
}
export const PugTransformerPlugin = function ({ pugOptions = {}, pugLocals = {} } = {}) {
    return {
        name: 'vite-plugin-pug-transformer',
        transformIndexHtml: {
            enforce: 'pre',
            transform(html, { filename }) {
                const updatedHtml = html.replace(/<template.*?data-type="pug".*?(\/>|<\/template>)/g, (matchedString) => {
                    const [, rawTemplatePath] = matchedString.match(/data-src=["'](.*?)["']/) || [];

                    if (!rawTemplatePath) {
                        throw new Error(`Template path not specified for ${matchedString}`);
                    }

                    const entryFileDir = filename.replace(/(.*)\/.*\.html$/, '$1');
                    const templateFilePath = path.join(entryFileDir, rawTemplatePath);

                    return compileFile(templateFilePath, pugOptions)(pugLocals);
                });

                return updatedHtml;
            },
        },
    };
}