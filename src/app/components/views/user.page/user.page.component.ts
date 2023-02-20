import {Component, OnInit} from '@angular/core';
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {Router} from "@angular/router";


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

  constructor(private router: Router) {
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
}
