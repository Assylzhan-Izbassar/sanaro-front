import { Injectable } from '@angular/core';
import { Observable, tap, catchError, map, interval, switchMap } from 'rxjs';
import { BaseService } from '../core/base.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private readonly url: string = `${this.apiUrl}/auth/jwt/create/`;
  private readonly refreshUrl: string = `${this.apiUrl}/auth/jwt/refresh/`;
  private readonly tokenKey: string = 'jwtToken';
  private readonly refreshTokenKey = 'refresh_token';

  /**
   * Creating credentials for the user.
   * @param username - Username
   * @param password - Password
   * @returns - Credentials, like access and refresh token.
   */
  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post<any>(this.url, data).pipe(
      tap((response) => {
        const { access, refresh } = response;

        this.saveToken(access);
        this.saveRefreshTokenCookie(refresh);
        // start periodically call refresh token
        this.startTokenRefreshTimer(this.getExpDate(access).getMilliseconds());
      })
    );
  }

  /**
   * Refresh the token.
   * @returns - New access token value.
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshTokenCookie();
    let data = { refresh: refreshToken };
    return this.http.post<any>(this.refreshUrl, data).pipe(
      tap((response) => {
        const { access } = response;
        this.saveToken(access);
      })
    );
  }

  /**
   * Removes access and refresh tokens from browser storage.
   */
  logout(): void {
    this.removeToken();
    this.removeRefreshTokenCookie();
  }

  /**
   * Saves access token value to local storage.
   * @param token - Access token value.
   */
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Gets access token value.
   * @returns - Access token value.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Remove access token from local storage.
   */
  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Saves refresh token to cookie.
   * @param token - Refresh token value.
   */
  private saveRefreshTokenCookie(token: string): void {
    this.cookieService.set(
      this.refreshTokenKey,
      token,
      this.getExpDate(token).getDay()
    );
  }

  /**
   * Gets refresh token from cookie.
   * @returns - Refresh token value.
   */
  getRefreshTokenCookie(): string | null {
    return this.cookieService.get(this.refreshTokenKey);
  }

  /**
   * Remove refresh token from cookie.
   */
  private removeRefreshTokenCookie(): void {
    this.cookieService.delete(this.refreshTokenKey);
  }

  /**
   * Timer for refreshing access token.
   * @param delta - Time in milliseconds.
   */
  private startTokenRefreshTimer(delta: number): void {
    interval(delta - 10000)
      .pipe(switchMap(() => this.refreshToken()))
      .subscribe(() => {
        console.log('refreshed!');
      });
  }

  /**
   * Gets expiration date of the token.
   * @param token
   * @returns
   */
  private getExpDate(token: string): Date {
    let decodedToken: any = jwtDecode(token);
    let exp: number = decodedToken.exp;

    const tokenExpiration = new Date(1970, 0, 1);
    tokenExpiration.setSeconds(exp);

    return tokenExpiration;
  }
}
