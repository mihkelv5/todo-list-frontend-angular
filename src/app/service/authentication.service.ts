import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host = "http://127.0.0.1:8081";
  private token = "";
  private loggedInUsername = "";
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public getRefreshToken(user: UserModel) : Observable<HttpResponse<string>>{
    const headers = new HttpHeaders().set("username", user.username).set("password", user.password)
    return this.http.get<string>(this.host + "/auth/login", {observe: "response", headers: headers, withCredentials: true})

  }


  public register(user: UserModel) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<UserModel>>
    (this.host + "/auth/register", user);
  }

  public getAccessToken(username: string) : Observable<HttpResponse<UserModel>> {
    const headers = new HttpHeaders().set("username", username);
    return this.http.get<UserModel>(this.host + "/auth/get-access", {observe: "response", headers: headers, withCredentials: true})
  }

  public logout() {
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if(this.cookieService.check("Login-Cookie")){
      this.cookieService.delete("Login-Cookie")
      const sub = this.http.get<string>(this.host + "/auth/logout", {observe: "response", withCredentials: true}).subscribe(
        () => sub.unsubscribe()
      )
    }
  }


  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem("token", token);
  }
  public getTokenExpiryDate(): Date | null {
    return this.jwtHelper.getTokenExpirationDate(this.getToken())
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

  public isUserLoggedIn() {
    const cookie = this.cookieService.get("Login-Cookie")
    if(cookie){
      return true;
    }
    this.logout();
    return false;
  }
}
