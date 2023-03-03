import {PublicUserModel} from "./publicUser.model";

export class PrivateUserModel {
  id: string;
  email: string;
  publicUser: PublicUserModel;


  constructor(id: string, email: string, publicUser: PublicUserModel) {
    this.id = id;
    this.email = email;
    this.publicUser = publicUser;
  }
}
