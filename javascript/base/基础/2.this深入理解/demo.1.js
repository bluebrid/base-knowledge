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

