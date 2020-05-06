/**
 * 需要配置babel插件： @babel/plugin-proposal-optional-chaining
 */
const User = {
    name: 'ivan', 
    age: 18, 
    address: {
        province: 'GD',
        city: 'SZ'
    }
}
const User1 = {
    name: 'ivan', 
    age: 18, 
}
console.log(User?.address?.city)
console.log(User1?.address?.city)
export default User