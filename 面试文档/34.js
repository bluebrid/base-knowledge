// https://cataas.com/#/

// function getCatByTags(tags) {
//   const baseUrl = `https://cataas.com/api`;
//   const paramTags = tags ? (Array.isArray(tags) ? tags : [tags]) : [""];
//   const url = `${baseUrl}/cats?tags=${paramTags.join(",")}`;
//   for (let i = 0; i < 300; i++) {
//     (() => {
//       setTimeout(() => {
//         let start = Date.now();
//         fetch("https://www.baidu.com").then((res) => {
//           console.log(Date.now() - start);
//         });
//       }, Math.floor(Math.random() * 1000));
//     })();
//   }
// }
// getCatByTags(["fail", "gif"]); // .then(res => console.log(res))
// cute

// https://cataas.com/#/

function getCatByTags1(tags) {
  const url = `https://develop2.1024paas.com/api/v1/paas/ticket`;
  // const paramTags = tags ? Array.isArray(tags) ? tags : [tags] : ['']
  // const url = `${baseUrl}/cats?tags=${paramTags.join(',')}`
  // return fetch(url).then(res => res.json()).then(res => res)
  let data =
    "YmVuY2htYXJrX3BhYXNfdGVzdHw0NTcyOTA0MjgzMjkzNjE0MDh8NDQyNTEzOTg0NDExNzk1NDU3fDE3NDE1MDU4NDAwMDB8aXZhbnhqZmFufA==";
  let buff = Buffer.from(data, "base64");
  let text = buff.toString("utf8");
  console.log(text);
  //   for (let i = 0; i < 10; i++) {
  //     const request = new Request(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         start: Date.now(),
  //         ticket:
  //           "YmVuY2htYXJrX3BhYXNfdGVzdHw0NTcyOTA0MjgzMjkzNjE0MDh8NDQyNTEzOTg0NDExNzk1NDU3fDE3NDE1MDU4NDAwMDB8aXZhbnhqZmFufA==",
  //       }),
  //     });
  //     fetch(request)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         // console.log(res)
  //         console.log(Date.now() - res.data.start);
  //       });
  //   }
  console.log("-------------END");
}
// getCatByTags1();
// cute
P
fs.readdir('../', async (err, files) => {
  if (!err) {
    console.log(files)
  }
})