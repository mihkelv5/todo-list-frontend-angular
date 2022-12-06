export class UserModel {

  id: number;
  username: string;
  password: string;
  enabled: boolean;
  roles: string;


  constructor(id: number, username: string, password: string, enabled: boolean, roles: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.roles = roles;
  }
}
