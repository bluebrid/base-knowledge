const { useBabelRc, override, overrideDevServer, addWebpackAlias } = require("customize-cra");
const path = require('path');
let list = ["Item 1", "Item 2", "Item 3"];
const devServerConfig = () => config => {
    return {
        ...config,
        before(app) {
            // This lets us open files from the runtime error overlay.
            app.all("/api/data", (req, res) => {
                if (req.query.add) {
                    if (!list.includes(req.query.add)) {
                        list.push(req.query.add);
                    }
                } else if (req.query.clear) {
                    list = [];
                }
                res.json(list);
            });
        }
    };
};
module.exports = {
    webpack: override(
        // usual webpack plugin
        useBabelRc(),
        addWebpackAlias({
            // 'redux': path.resolve(__dirname, "../../../redux/src"),
            // 'react-redux': path.resolve(__dirname, "../../../react-redux/src"),
            // '@': path.resolve(__dirname, './src/'),
            // '@components': path.resolve(__dirname, './src/components/index/public'),
        }),
    ),
    devServer: overrideDevServer(
        // dev server plugin
        devServerConfig()
    )
};

// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// resolve: {
//   alias: {
//     // "react-router": path.resolve(__dirname, "../packages/react-router/modules"),
//     // "react-router-dom": path.resolve(__dirname, "../packages/react-router-dom/modules"),
//     // "history": path.resolve(__dirname, "../packages/history"),
//     "react-router": path.resolve(__dirname, "../packages/react-router"),
//     "react-router-dom": path.resolve(__dirname, "../packages/react-router-dom"),
//     "history": path.resolve(__dirname, "../packages/history"),
//   }
// },