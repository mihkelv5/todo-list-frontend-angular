
import {PrivateUserModel} from "../../model/user/privateUser.model";
import {EventInvitationModel} from "../../model/eventInvitation.model";

export interface UsersStateInterface {
  loggedIn: boolean;
  privateUser: PrivateUserModel;
  invites: EventInvitationModel[];
}
