export class PrivateUserModel {
  id: string;
  username: string;
  email: string;
  imageString: string;
  //picture, private data etc

  constructor(id: string, username: string, email: string, imageString: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.imageString = imageString;
  }
}
