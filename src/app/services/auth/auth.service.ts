import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../core/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private _url: string = `${this.apiUrl}/auth/jwt/create/`;
  // getter for _url
  public get url(): string {
    return this._url;
  }

  private _tokenKey: string = 'jwtToken';
  // getter for _tokenKey
  public get tokenKey(): string {
    return this._tokenKey;
  }

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
