export class UserModel {

  id: string;
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  roles: string;


  constructor(id: string, username: string, email: string, password: string, enabled: boolean, roles: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.enabled = enabled;
    this.roles = roles;
  }
}
