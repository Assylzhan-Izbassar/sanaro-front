import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { DialogService } from '../services/dialog/dialog.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthDialogComponent {
  private _username: string = '';
  private _password: string = '';

  // getter and setter for _username
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  // getter and setter for _password
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  /**
   * Logins to the system.
   */
  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.dialogService.closeDialog();
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }

  /**
   * Opens registration dialog.
   */
  openRegisterDialog() {
    this.dialogService.closeDialog();
    setTimeout(() => {
      this.dialogService.openRegisterDialog(null);
    }, 100);
  }
}
