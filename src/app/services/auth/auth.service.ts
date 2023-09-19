import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, interval, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from '../core/base.service';
import { UserData } from 'src/app/models/user.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private readonly url: string = `${this.apiUrl}/auth/jwt/create/`;
  private readonly refreshUrl: string = `${this.apiUrl}/auth/jwt/refresh/`;
  private readonly usersUrl: string = `${this.apiUrl}/auth/users/`
  private readonly tokenKey: string = 'jwtToken';
  private readonly refreshTokenKey = 'refresh_token';
  private subscription?: Subscription;

  constructor(
    protected override http: HttpClient,
    protected override cookieService: CookieService
  ) {
    super(http, cookieService);
    window.addEventListener(
      'beforeunload',
      this.logoutOnWindowClose.bind(this)
    );
  }

  /**
   * Opens the confirmation popup when closing the window.
   * @param event - Window event.
   */
  private logoutOnWindowClose(event: any) {
    // event.preventDefault();
    // event.returnValue = 'Are you sure you want to leave?';
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.logout();
  }

  /**
   * Creating credentials for the user.
   * @param username - Username
   * @param password - Password
   * @returns - Credentials, like access and refresh token.
   */
  login(data: any): Observable<any> {
    return this.http.post<any>(this.url, data).pipe(
      tap((response) => {
        const { access, refresh } = response;

        this.saveToken(access);
        this.saveRefreshTokenCookie(refresh);

        if (this.getRefreshTokenCookie() && this.getToken()) {
          let exp = this.getExpDate(access);
          exp.setHours(exp.getHours() + 6);
          let delta = exp.getTime() - new Date().getTime();
          this.startTokenRefreshTimer(delta);
        }
      })
    );
  }

  /**
   * Registers a new user.
   * @param userData - Data to register a new user.
   */
  register(userData: UserData): Observable<any> {
    return this.http.post<UserData>(this.usersUrl, userData);
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
   * Refresh the token.
   * @returns - New access token value.
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshTokenCookie();
    let data = { refresh: refreshToken };
    if (!refreshToken) {
      this.removeToken();
    }
    return this.http.post<any>(this.refreshUrl, data);
  }

  /**
   * Timer for refreshing access token.
   * @param delta - Time in milliseconds.
   */
  private startTokenRefreshTimer(delta: number): void {
    if (!delta) return;
    this.subscription = interval(delta - 10000).subscribe(() => {
      this.refreshToken().subscribe({
        next: (response) => {
          const { access } = response;
          this.saveToken(access);
        },
        error: (error) => console.error(error),
      });
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
