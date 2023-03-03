
import {PrivateUserModel} from "../../model/user/privateUser.model";
import {EventInvitationModel} from "../../model/eventInvitation.model";

export interface UserStateInterface {
  loggedIn: boolean;
  privateUser: PrivateUserModel;
  errorMessage: string;
  invites: EventInvitationModel[];
}
