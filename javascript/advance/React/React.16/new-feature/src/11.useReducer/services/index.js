async function asyncFetch(p) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });
}
const service = {
  asyncFetch: asyncFetch
};
export default service;
