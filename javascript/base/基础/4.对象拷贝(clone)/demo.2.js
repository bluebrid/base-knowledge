'use strict'
/**
 * Object.assign 是浅拷贝
 * @type {Object}
 */
let originObj={
	name:'ivan',
	age:'21',
	address:{
		first:'GD',
		last:'Sz'
	}
}
let cloneObj=Object.assign({},originObj);
console.log(cloneObj);
cloneObj.name='new ivan';
cloneObj.address.first='HN';
console.log(cloneObj);
console.log(originObj)