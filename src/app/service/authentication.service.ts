import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {UserModel} from "../model/user/user.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService} from "ngx-cookie-service";
import {HeaderType} from "../enum/header-type.enum";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../ngrx-store/state/appState.interface";
import * as UsersActions from "../ngrx-store/actions/user.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host = "http://127.0.0.1:8081";
  private token = "";
  private loggedInUsername = "";
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient, private cookieService: CookieService, private store: Store<AppStateInterface>) {}

    //gets triggered when app is opened for the first time
    loadData() {
        const cookie = this.cookieService.get("Login-Cookie")
        if(cookie){
            const username = cookie.valueOf();
            this.getAccessToken(username).pipe(take(1)).subscribe(
                response => {
                    const token = response.headers.get(HeaderType.JWT_TOKEN);
                    if(token) {
                        this.saveToken(token)
                        this.store.dispatch(UsersActions.getUserData())
                    }
                }
            )
        }
    }

  public getRefreshToken(user: UserModel) : Observable<HttpResponse<string>>{
    const headers = new HttpHeaders().set("username", user.username).set("password", user.password)
    return this.http.get<string>(this.host + "/auth/login", {observe: "response", headers: headers, withCredentials: true})

  }

  public getAccessToken(username: string) : Observable<HttpResponse<string>> {
    const headers = new HttpHeaders().set("username", username);
    return this.http.get<string>(this.host + "/auth/get-access", {observe: "response", headers: headers, withCredentials: true})
  }

  public register(user: UserModel) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<UserModel>>
    (this.host + "/auth/register", user);
  }


  public logout(): Observable<HttpResponse<string>> {
      this.cookieService.delete("Login-Cookie", "/")
      this.token = "";
      this.loggedInUsername = "";
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      return this.http.get<string>(this.host + "/auth/logout", {observe: "response", withCredentials: true})
  }


  public saveToken(token: string): void {
    this.token = token;
      sessionStorage.setItem("token", token);
  }

  public loadToken(): void {
    this.token = sessionStorage.getItem("token") || "";
  }

  public getToken() : string {
    return this.token;
  }

  public isUserLoggedIn() {
    const cookie = this.cookieService.get("Login-Cookie")
    if(cookie){

      const token = sessionStorage.getItem("token")

      //if cookie exists, but access token is missing (e.g. new session) or token is about to expire
      if(!token || this.jwtHelper.isTokenExpired(token, 60)) {
          console.log(token)
        const sub = this.getAccessToken(cookie.valueOf()).subscribe(
          (response) => {
            const accessToken = response.headers.get(HeaderType.JWT_TOKEN);
            if(accessToken && response.body){
                this.saveToken(accessToken);
                window.location.reload();
            }
            sub.unsubscribe();
          }
        )
      }
      return true;
    }
    this.logout();
    return false;
  }

}
