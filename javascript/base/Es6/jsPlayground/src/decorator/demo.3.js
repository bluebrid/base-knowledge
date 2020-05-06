function isLoggedIn(status) {
  return function(classRef) {
    return class extends classRef {
      constructor(lastName, firstName) {
        super(lastName, firstName);
        this.isLoggedIn = status || false;
      }
    };
  };
}

@isLoggedIn()
class User {
  constructor(lastName, firstName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

var user = new User('ivan', 'fan')
console.log(user.isLoggedIn)

export default User;
