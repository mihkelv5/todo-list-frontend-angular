import {PublicUserModel} from "../../model/publicUser.model";

export interface CurrentUserStateInterface {

  publicUserData: PublicUserModel;
  userId: string;
  email: string;
  //etc
}
