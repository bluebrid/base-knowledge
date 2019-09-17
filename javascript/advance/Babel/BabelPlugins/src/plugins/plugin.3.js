const babylon = require('babylon')
const code = `function square(n) {
  return n * n;
}`;

console.dir(babylon.parse(code))