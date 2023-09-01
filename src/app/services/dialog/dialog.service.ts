import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';
import { QuestionnaireDialogComponent } from 'src/app/questionnaire-dialog/questionnaire-dialog.component';
import { NotifyDialogComponent } from 'src/app/notify-dialog/notify-dialog.component';

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
      width: '50vw',
      data: data,
    });
  }

  /**
   * Opens notification dialog.
   * @param data - Can be any data that should represent mat-dialog.
   */
  openNotifyDialog(isError: boolean): void {

    let data = {};
    if (isError) {
      data = {
        message: 'Упс! Вопросы к сожалению не подгрузились!',
        imgPath: '../../assets/questionnaire/circle-cross.svg',
        isError: true
      }
    } else {
      data = {
        message: 'Спасибо, мы скоро с вами свяжемся!',
        imgPath: '../../assets/questionnaire/circle-check.svg',
        isError: false
      }
    }

    this.dialogRef = this.dialog.open(NotifyDialogComponent, {
      panelClass: 'custom-modalbox',
      width: '40vw',
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
      width: '50vw',
      data: data,
    });
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
