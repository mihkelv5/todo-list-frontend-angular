import {Component, OnInit} from '@angular/core';
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {Router} from "@angular/router";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import * as UserSelector from "../../../ngrx-store/selectors/user.selector";
import {PublicUserModel} from "../../../model/user/publicUser.model";
import * as UserActions from "../../../ngrx-store/actions/user.actions";

@Component({
  selector: 'app-user.page',
  templateUrl: './user.page.component.html',
  styleUrls: ['./user.page.component.css']
})
export class UserPageComponent implements OnInit{
  faPenToSquare = faPenToSquare;
  isUserOwnProfile: boolean = false;
  menuSelector: string[] = ["Activity history", "Friends", "Messages"];
  selectedMenu: number = 0;

  currentUser$!: Observable<PrivateUserModel>

  constructor(private router: Router, private store: Store<AppStateInterface>) {
    this.currentUser$ = this.store.select(UserSelector.getUserDataSelector)
    this.store.dispatch(UserActions.getUserData());
  }

  ngOnInit(): void {
    if(this.router.url === "/profile/private"){
      this.isUserOwnProfile = true;
    }
  }

  logNumber() {
    console.log(this.selectedMenu)
  }

  changeSelected(value: number){
    this.selectedMenu = value;
  }

  getPublicUserModel(user: PrivateUserModel): PublicUserModel {
    return user.publicUser;
  }
}
