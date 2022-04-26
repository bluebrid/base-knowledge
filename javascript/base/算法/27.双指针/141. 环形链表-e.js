var hasCycle = (head) => {
    let map = new Map();
    while (head) {
        if (map.has(head)) return true;//如果当前节点在map中存在就说明有环
        map.set(head, true);//否则就加入map
        head = head.next;//迭代节点
    }
    return false;//循环完成发现没有重复节点，说明没环
};