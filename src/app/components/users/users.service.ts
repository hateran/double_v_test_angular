import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }

  listUsers(per_page: number, page: number, order: string, sort: string, search_pattern?: string) {
    let headers = new HttpHeaders();
    let _headers = headers.append('accept', `application/vnd.github+json`);
    let url = `search/users?q=YOUR_NAME&per_page=${per_page}&page=${page}&order=${order}&sort=${sort}`;

    if (search_pattern) {
      url = url.replace('YOUR_NAME', search_pattern);
    }

    return this._httpClient.get(`${environment.apiUrl}/${url}`, { headers: _headers });
  }

  listFollowers(login: string, per_page: number, page: number) {
    let headers = new HttpHeaders();
    let _headers = headers.append('accept', `application/vnd.github+json`);
    let url = `users/${login}/followers?per_page=${per_page}&page=${page}`;

    return this._httpClient.get(`${environment.apiUrl}/${url}`, { headers: _headers });
  }

  listOrgs(login: string, per_page: number) {
    let headers = new HttpHeaders();
    let _headers = headers.append('accept', `application/vnd.github+json`);
    let url = `users/${login}/orgs?per_page=${per_page}`;

    return this._httpClient.get(`${environment.apiUrl}/${url}`, { headers: _headers });
  }

  listRepos(login: string, per_page: number, page: number, direction: string, sort: string, type: string) {
    let headers = new HttpHeaders();
    let _headers = headers.append('accept', `application/vnd.github+json`);
    let url = `users/${login}/repos?per_page=${per_page}&page=${page}&direction=${direction}&sort=${sort}&type=${type}`;

    return this._httpClient.get(`${environment.apiUrl}/${url}`, { headers: _headers });
  }
}
