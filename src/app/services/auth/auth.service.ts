import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl;
  private _url: string = `${this.apiUrl}/auth/jwt/create/`;
  private _tokenKey: string = 'jwtToken';

  // getter for _apiUrl
  public get apiUrl(): string {
    return this._apiUrl;
  }

  // getter for _url
  public get url(): string {
    return this._url;
  }

  // getter for _tokenKey
  public get tokenKey(): string {
    return this._tokenKey;
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post(this.url, data);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
