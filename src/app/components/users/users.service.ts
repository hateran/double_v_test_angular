import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }

  listPost(page: number, limit: number, order: string, order_by: string) {
    let headers = new HttpHeaders();
    let _headers = headers.append('Accept', `application/vnd.github+json`);
    let url = `users`;

    return this._httpClient.get(`${environment.apiUrl}/${url}`, { headers: headers });
  }
}
