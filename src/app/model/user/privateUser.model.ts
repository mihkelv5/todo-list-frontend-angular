export class PrivateUserModel {
  id: string;
  username: string;
  email: string;
  //picture, private data etc

  constructor(id: string, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}
