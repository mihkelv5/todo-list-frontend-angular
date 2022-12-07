import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host = environment.apiBaseUrl;
  private token = "";
  private loggedInUsername = "";
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) {}

  public login(user: UserModel) : Observable<HttpResponse<UserModel>> {

    return this.http.post<UserModel>(this.host + "/user/login", user, {observe: "response"});
  }


  public register(user: UserModel) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<UserModel>>
    (this.host + "/user/register", user);
  }

  public logout(): void {
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  //TODO: save data in cookies instead of localstorage

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem("token", token);
  }

  public addUserToLocalCache(user: UserModel): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUserFromLocalCache(): UserModel {
      return JSON.parse(localStorage.getItem("user") || "{}")
  }


  public loadToken(): void {
    this.token = localStorage.getItem("token") || "";
  }

  public getToken() : string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if(this.token !== "") {
      if(this.jwtHelper.decodeToken(this.token).sub !== ""){
        if(!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }

    this.logout();
    return false;
  }
}
