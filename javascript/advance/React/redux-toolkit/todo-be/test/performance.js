const request = require('request');

for (let i = 0; i < 100; i++) {
    request({
        url: "http://localhost:8080/todos/f7a67fb0-76bd-11e7-be2e-8fe734dbe800",
        method: "post",
        json: true,
        body: {text: "neco" + i},
    }, () => console.log(`${i} completed`));
}
