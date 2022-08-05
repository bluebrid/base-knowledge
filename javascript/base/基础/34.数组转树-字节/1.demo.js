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
  let obj = {}, // 使用对象重新存储数据
    res = [], // 存储最后结果
    len = data.length

  // 遍历原始数据data，构造obj数据，键名为id，值为数据
  for (let i = 0; i < len; i++) {
    obj[data[i]['id']] = data[i]
  }

  // 遍历原始数据
  for (let j = 0; j < len; j++) {
    let list = data[j]
    // 通过每条数据的 pid 去obj中查询
    let parentList = obj[list['pid']]

    if (parentList) {
      // 根据 pid 找到的是父节点，list是子节点，
      if (!parentList['children']) {
        parentList['children'] = []
      }
      // 将子节点插入 父节点的 children 字段中
      parentList['children'].push(list)
    } else {
      // pid 找不到对应值，说明是根结点，直接插到根数组中
      res.push(list)
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
  let obj = {}, // 使用对象重新存储数据
    res = [], // 存储最后结果
    len = data.length

  // 遍历原始数据data，构造obj数据，键名为id，值为数据
  for (let i = 0; i < len; i++) {
    obj[data[i]['id']] = data[i]
  }

  // 遍历原始数据
  for (let j = 0; j < len; j++) {
    let list = data[j]
    // 通过每条数据的 pid 去obj中查询
    let parentList = obj[list['pid']]

    if (parentList) {
      // 根据 pid 找到的是父节点，list是子节点，
      if (!parentList['children']) {
        parentList['children'] = []
      }
      // 将子节点插入 父节点的 children 字段中
      parentList['children'].push(list)
    } else {
      // pid 找不到对应值，说明是根结点，直接插到根数组中
      res.push(list)
    }
  }

  return res
}

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(toTree(data))