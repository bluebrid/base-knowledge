function isLoggedIn(status) {
  //Actuall Decorator implementation
  return function(classRef) {
    const classConstructor = function(firstName, lastName) {
      classRef.prototype.someFunc = () => {
        console.log("You're doing pretty well actually!");
      };
      console.log("Proto: ", classRef.prototype);
      this.firstName = firstName;
      this.lastName = lastName;
      this.isLoggedIn = status || false;
      this.getFullName = function() {
        return this.lastName + " " + this.firstName;
      };
    };
    classConstructor.prototype = classRef.prototype;
    return classConstructor;
  };
}

@isLoggedIn(true)
class User {
  constructor(lastName, firstName) {
    this.lastName = lastName;
    this.firstName = firstName;
  }
}


const user = new User("Maboud", "Islem");
console.log("User", user, user.getFullName());
console.log("Prototype: ", User.prototype);

export default User