const ticket = 'c2hvd21lYnVnfDQ2MjY1OTIyODA1ODkxMDcyMHw0NTE5Mjk3MTAxODQ3NTkyOTd8MTY2ODIxODYyMDU3MnxudWxsfA=='
const buff = Buffer.from(ticket, 'base64');
const ticketInfos = buff.toString('utf8').split('|');
const [, playgroundId, userId] = ticketInfos;
console.log(playgroundId)