export class User {

    constructor(id,login,password,role) {
      this.id = id;
      this.login = login;
      this.password = password;
      this.role = role;
    }
  
    login() {
      alert(this.login);
    }
  
  }