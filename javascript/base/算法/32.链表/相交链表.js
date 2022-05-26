const Node = function (data) {
  this.data = data;
  this.next = null;
}
const nodeA = new Node('A');
const nodeB = new Node('B');
const nodeC = new Node('C');
const node1 = new Node('1');
const node2 = new Node('2');
const node3 = new Node('3');
const nodeD4 = new Node('D4');
const nodeE5 = new Node('E5');
nodeA.next = nodeB;
nodeB.next = nodeC;
nodeC.next = nodeD4;

nodeD4.next = nodeE5

node1.next = node2;
node2.next = node3;
node3.next = nodeD4;
// nodeD4.next = nodeE5;

/**
 * 判断两个单链表是否相交并求出相交的第一结点。
 * 也就是两个链表是否由共同的节点
 * @param {*} head1 
 * @param {*} head2 
 */
function intersectNode(head1, head2) {
  let point1 = head1;
  let point2 = head2;
  while(point1 && point1.next) {
    if (point1 === point2) {
      return point1
    }
    while(point2 && point2.next) {
      if (point2 === point1) {
        return point1
      }
      point2 = point2.next;
    }
    point1 = point1.next
  }
  if (point1 === point2) {
    return point1
  }
  return null;
}

console.log(intersectNode(nodeA, node1))