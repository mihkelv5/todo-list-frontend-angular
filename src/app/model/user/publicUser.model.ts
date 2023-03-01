export class PublicUserModel {
  username: string;
  imageString: string;


  constructor(username: string, imageString: string) {
    this.username = username;
    this.imageString = imageString;
  }
}
