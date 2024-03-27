import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifyDialogComponent } from 'src/app/pages/notify-dialog/notify-dialog.component';
import { CallRequestDialogComponent } from 'src/app/pages/call-request-dialog/call-request-dialog.component';
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
   * Closes current opened modal dialog.
   */
  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
