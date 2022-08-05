<<<<<<< HEAD
const Node = function (data) {
  this.data = data;
  this.next = null;
}
const nodeA = new Node('A');
const nodeB = new Node('B');
const nodeC = new Node('C');
const nodeD = new Node('D');
const nodeE = new Node('E');
const nodeF = new Node('F');
nodeA.next = nodeB;
nodeB.next = nodeC;
nodeC.next = nodeD;
nodeD.next = nodeE;
nodeE.next = nodeF;
// nodeF.next = nodeA;
function isCircularLinkedList(head) {
  if (head === null || head.next === null) {
      return false;
  }
  let point1 = head;
  let point2 = head;
  do {
      point1 = point1.next;
      point2 = point2.next && point2.next.next;
      console.log(point1.data, point2.data)
  } while(point1 && point2 && point1 !== point2);
  if (point1 === point2) {
      return true;
  }
  return false;
}

function isCircularLinkedList1(head) {
  if (head === null || head.next === null) {
      return false;
  }
  let point = head;
  while(point && point.next) {
    let point2 = point.next
    while(point2 && point2.next) {
      if (point2 === point) {
        return true
      }
      point2 = point2.next
    }
    point = point.next
  }
  return false;
}

// console.log(isCircularLinkedList(nodeA));
=======
const Node = function (data) {
  this.data = data;
  this.next = null;
}
const nodeA = new Node('A');
const nodeB = new Node('B');
const nodeC = new Node('C');
const nodeD = new Node('D');
const nodeE = new Node('E');
const nodeF = new Node('F');
nodeA.next = nodeB;
nodeB.next = nodeC;
nodeC.next = nodeD;
nodeD.next = nodeE;
nodeE.next = nodeF;
// nodeF.next = nodeA;
function isCircularLinkedList(head) {
  if (head === null || head.next === null) {
      return false;
  }
  let point1 = head;
  let point2 = head;
  do {
      point1 = point1.next;
      point2 = point2.next && point2.next.next;
      console.log(point1.data, point2.data)
  } while(point1 && point2 && point1 !== point2);
  if (point1 === point2) {
      return true;
  }
  return false;
}

function isCircularLinkedList1(head) {
  if (head === null || head.next === null) {
      return false;
  }
  let point = head;
  while(point && point.next) {
    let point2 = point.next
    while(point2 && point2.next) {
      if (point2 === point) {
        return true
      }
      point2 = point2.next
    }
    point = point.next
  }
  return false;
}

// console.log(isCircularLinkedList(nodeA));
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(isCircularLinkedList1(nodeA));