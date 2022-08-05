<<<<<<< HEAD
// 扁平化的数据转换成树形结构的数据
var data = [
  { 'id': 101, 'name': '语文', 'pid': -1 },
  { 'id': 102, 'name': '语文知识点1', 'pid': 101 },
  { 'id': 103, 'name': '语文知识点11', 'pid': 102 },
  { 'id': 104, 'name': '语文知识点2', 'pid': 101 },
  { 'id': 202, 'name': '数学知识点1', 'pid': 201 },
  { 'id': 201, 'name': '数学', 'pid': -1 },
  { 'id': 203, 'name': '数学知识点2', 'pid': 201 },
  { 'id': 204, 'name': '数学知识点3', 'pid': 201 },
  { 'id': 301, 'name': '数学知识点3', 'pid': 204 },
  { 'id': 302, 'name': '英语知识点1', 'pid': 301 }

];

function toTree(data) {
  let map = new Map()
  const len = data.length;
  for (let i = 0; i < len; i++) {
    map.set(data[i].id, data[i])
  }
  let res = [];
  // 利用对象是引用类型的方式处理
  for (let i = 0; i < len; i++) {
    const item = data[i]
    if (item.pid === -1) {
      res.push(item)
    } else {
      const parentItem = map.get(item.pid)
      parentItem.children = parentItem.children || []
      parentItem.children.push(item)
    }
  }
  return res
}

=======
// 扁平化的数据转换成树形结构的数据
var data = [
  { 'id': 101, 'name': '语文', 'pid': -1 },
  { 'id': 102, 'name': '语文知识点1', 'pid': 101 },
  { 'id': 103, 'name': '语文知识点11', 'pid': 102 },
  { 'id': 104, 'name': '语文知识点2', 'pid': 101 },
  { 'id': 202, 'name': '数学知识点1', 'pid': 201 },
  { 'id': 201, 'name': '数学', 'pid': -1 },
  { 'id': 203, 'name': '数学知识点2', 'pid': 201 },
  { 'id': 204, 'name': '数学知识点3', 'pid': 201 },
  { 'id': 301, 'name': '数学知识点3', 'pid': 204 },
  { 'id': 302, 'name': '英语知识点1', 'pid': 301 }

];

function toTree(data) {
  let map = new Map()
  const len = data.length;
  for (let i = 0; i < len; i++) {
    map.set(data[i].id, data[i])
  }
  let res = [];
  // 利用对象是引用类型的方式处理
  for (let i = 0; i < len; i++) {
    const item = data[i]
    if (item.pid === -1) {
      res.push(item)
    } else {
      const parentItem = map.get(item.pid)
      parentItem.children = parentItem.children || []
      parentItem.children.push(item)
    }
  }
  return res
}

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(toTree(data))