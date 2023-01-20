export class PublicUserModel {
  username: string
  profilePicture: string = ""; //implemented later


  constructor(username: string) {
    this.username = username;
  }
}
