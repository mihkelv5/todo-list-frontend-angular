import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host = "http://127.0.0.1:8081";
  private token = "";
  private loggedInUsername = "";
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) {}

  public login(user: UserModel) : Observable<any> {
    const headers = new HttpHeaders().set("username", user.username).set("password", user.password)
    return this.http.get<any>(this.host + "/auth/login", {observe: "response", headers: headers, withCredentials: true});
  }


  public register(user: UserModel) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<UserModel>>
    (this.host + "/auth/register", user);
  }

  public logout(): void {
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }


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
