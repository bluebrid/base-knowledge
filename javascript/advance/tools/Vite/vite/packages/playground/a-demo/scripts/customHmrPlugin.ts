export const CustomHmrPlugin = {
  name: 'custom-hmr',
  enforce: 'post',
  // HMR
  handleHotUpdate({ file, server }) {
    if (!file.endsWith('.coffee.js')) {
      console.log('reloading by:', file);
      server.ws.send({
        type: 'full-reload',
        path: '*'
      });
    }
  },
}
