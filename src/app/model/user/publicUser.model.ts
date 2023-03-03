export class PublicUserModel {
  username: string;
  imageString: string;
  joinDate: string;


  constructor(username: string, imageString: string, joinDate:string) {
    this.username = username;
    this.imageString = imageString;
    this.joinDate = joinDate;
  }
}
