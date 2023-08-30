import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';
import { QuestionnaireDialogComponent } from 'src/app/questionnaire-dialog/questionnaire-dialog.component';

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

    if(localStorage.getItem('jwtToken')) {
      this.dialogRef = this.dialog.open(QuestionnaireDialogComponent, {
        panelClass: 'custom-modalbox',
        width: '50vw',
        data: data,
      })
    } else {
      this.dialogRef = this.dialog.open(AuthDialogComponent, {
        panelClass: 'custom-modalbox',
        width: '50vw',
        data: data,
      });
    }

    if(this.dialogRef) {
      this.dialogRef.afterClosed().subscribe(() => {
        // Handle any action after the dialog is closed
      });
    }
  }

  closeDialog(): void {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
