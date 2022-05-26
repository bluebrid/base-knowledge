//Decorator
/**
 * 
 * @param {*} target 
 * @param {*} property 
 * @param 需要配置babel插件@babel/plugin-proposal-decorators  
 */
function readonly(target, property, descriptor) {
    descriptor.writable = false;
    return descriptor;
  }
  
  class User {
    constructor(lastName, firstName) {
      this.lastName = lastName;
      this.firstName = firstName;
    }
  
    @readonly
    getFullName() {
      return this.lastName + " " + this.firstName;
    }
  }
  
  // User.prototype.getFullName = function() {
  //   console.log("HACKED!");
  // };
  
 export default User;
  
  