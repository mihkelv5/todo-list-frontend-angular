import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrivateUserModel} from "../model/user/privateUser.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiBaseUrl + "/user";



  constructor(private http: HttpClient) {}

  public loadUserData(): Observable<PrivateUserModel> {
    return this.http.get<PrivateUserModel>(this.host + "/me");
  }
}
