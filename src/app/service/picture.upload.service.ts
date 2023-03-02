import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PictureUploadService {

  private host = environment.apiBaseUrl + "/user/profile/picture";

  constructor(private http: HttpClient) {
  }
    upload(image: File): Observable<string> {
      const formData = new FormData();
      formData.set("image", image);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data')
      headers.append('Content-Type', 'application/json')
      return this.http.post<string>(this.host, formData, {headers: headers})
    }
}
