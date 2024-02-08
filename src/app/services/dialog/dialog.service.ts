import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../pages/auth-dialog/auth-dialog.component';
import { QuestionnaireDialogComponent } from 'src/app/pages/questionnaire-dialog/questionnaire-dialog.component';
import { NotifyDialogComponent } from 'src/app/pages/notify-dialog/notify-dialog.component';
import { CallRequestDialogComponent } from 'src/app/pages/call-request-dialog/call-request-dialog.component';
import { RegisterDialogComponent } from 'src/app/pages/register-dialog/register-dialog.component';
import { GreetingDialogComponent } from 'src/app/pages/greeting-dialog/greeting-dialog.component';
import { ConfirmDialogComponent } from 'src/app/pages/confirm-dialog/confirm-dialog.component';
import { QuizComponent } from 'src/app/pages/quiz/quiz.component';
import { QuizEndComponent } from 'src/app/pages/quiz-end/quiz-end.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _dialogRef: MatDialogRef<any> | null = null;
  // getter and setter for _dialogRef
  public get dialogRef(): MatDialogRef<any> | null {
    return this._dialogRef;
  }
  public set dialogRef(value: MatDialogRef<any>) {
    this._dialogRef = value;
  }

  constructor(private dialog: MatDialog) {}

  /**
   * Opens authentication dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openDialog(data: any): void {
    if (localStorage.getItem('jwtToken')) {
      this.openQuestionnaireDialog(data);
    } else {
      this.openAuthDialog(data);
    }
    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe(() => {
        // Handle any action after the dialog is closed
      });
    }
  }

  /**
   * Opens questionnaire dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openQuestionnaireDialog(data: any): void {
    this.dialogRef = this.dialog.open(QuestionnaireDialogComponent, {
      panelClass: 'custom-modalbox',
      // width: '50vw',
      data: data,
    });
  }

  /**
   * Opens quiz dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openQuizDialog(data: any): void {
    this.dialogRef = this.dialog.open(QuizComponent, {
      panelClass: 'custom-modalbox',
      data: data,
    });
  }

  /**
   * Opens quiz-end dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openQuizEndDialog(data: any): void {
    this.dialogRef = this.dialog.open(QuizEndComponent, {
      panelClass: 'custom-modalbox',
      data: data,
    });
  }

  /**
   * Opens call request dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openRequestDialog(data: any): void {
    this.dialogRef = this.dialog.open(CallRequestDialogComponent, {
      panelClass: 'custom-modalbox',
      // width: '50vw',
      data: data,
    });
  }

  /**
   * Opens notification dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openNotifyDialog(isError: boolean, message: string): void {
    let data = {};
    if (isError) {
      data = {
        message: message,
        imgPath: 'assets/questionnaire/circle-cross.svg',
        isError: isError,
      };
    } else {
      data = {
        message: message,
        imgPath: 'assets/questionnaire/circle-check.svg',
        isError: isError,
      };
    }

    this.dialogRef = this.dialog.open(NotifyDialogComponent, {
      panelClass: 'custom-modalbox',
      // width: '40vw',
      data: data,
    });
  }

  /**
   * Opens authentication dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openAuthDialog(data: any): void {
    this.dialogRef = this.dialog.open(AuthDialogComponent, {
      panelClass: 'custom-modalbox',
      // width: '50vw',
      data: data,
    });
  }

  /**
   * Opens register dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openRegisterDialog(data: any): void {
    this.dialogRef = this.dialog.open(RegisterDialogComponent, {
      panelClass: 'custom-modalbox',
      // width: '50vw',
      data: data,
    });
  }

  /**
   * Opens greeting dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openGreetingDialog(data: any) {
    this.dialogRef = this.dialog.open(GreetingDialogComponent, {
      panelClass: 'custom-modalbox',
      // width: '50vw',
      data: data,
    });
  }

  /**
   * Opens confirmation dialog of user's email address to send the questionnaire result.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openConfirmDialog(data: any) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-modalbox',
      // width: '50vw',
      data: data,
    });
  }

  /**
   * Closes current opened modal dialog.
   */
  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
