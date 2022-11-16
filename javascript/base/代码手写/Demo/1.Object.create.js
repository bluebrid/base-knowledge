function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
  }

const obj = {
  name: "ivan",
  age: 18,
  address: {
    provice: "HN",
    city: "SZ",
  },
};

const newObj = Object.create(obj)

console.log(newObj)
newObj.age= 22;
newObj.address.provice='GD'
console.log(newObj)
console.log(obj)