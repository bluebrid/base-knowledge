import * as Y from 'yjs';
const yDoc = new Y.Doc();
const yElements = yDoc.getArray('elements');
const yElement = new Y.Map();
yElement.set('left', 100);
yElement.set('top', 100);
yElement.set('type', 'image');
console.log(yElement.get('left'))

yElements.push([yElement]); // 关联到yDoc
console.log(yElement.get('left'))