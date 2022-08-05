const path = require('path');
import coffeescript from "coffeescript";
import fs from 'fs'

export const CoffeescriptTransformerPlugin = function ({ pugOptions = {}, pugLocals = {} } = {}) {
    return {
        name: 'CoffeescriptTransformerPlugin',
        desc: "Coffeescript to Javascript",
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (req.url.endsWith('.coffee')) {
                    const templateFilePath = path.join(process.cwd(), req.url);
                    const buffer = fs.readFileSync(templateFilePath)
                    const source = buffer.toString();
                    const result = coffeescript.compile(source, {
                        ...{ sourceMap: true, bare: true },
                        ...{ filename: this.resourcePath },
                    });

                    res.setHeader('Content-Type', 'text/javascript')
                    res.statusCode = 200
                    res.end(result.js)
                    return
                }
                next()
            })
        },
    };
}