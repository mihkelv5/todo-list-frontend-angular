export class PrivateUserModel {
  id: string;
  username: string;
  email: string;
  imageString: string;
  joinDate: string;

  constructor(id: string, username: string, email: string, imageString: string, joinDate: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.imageString = imageString;
    this.joinDate = joinDate;
  }
}
