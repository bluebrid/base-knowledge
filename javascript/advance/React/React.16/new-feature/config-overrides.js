const { useBabelRc, override, overrideDevServer } = require("customize-cra");
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
    useBabelRc()
  ),
  devServer: overrideDevServer(
    // dev server plugin
    devServerConfig()
  )
};
