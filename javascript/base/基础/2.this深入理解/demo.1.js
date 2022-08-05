<<<<<<< HEAD
const User1 = {
    count1: 1,
    address: {
        message: 'hello world',
        getCount(){
            console.log(this.count1) 
        }
    }
}

const User = {
    count1: 1,
    address: {
        message: 'hello world',
        getCount: ()=> {
            console.log(this.count1)
        }
    }
}
User1.address.getCount()
const address1 = User1.address;
address1.getCount()

User.address.getCount()
const address = User.address;
address.getCount()

=======
class Foo {
    sayThis() {
        console.log(this); // 这里的 `this` 指向谁？
    }

    exec(cb) {
        cb();
    }

    render() {
        this.sayThis()
        this.exec(this.sayThis);
    }
}

var foo = new Foo();
foo.render();
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
