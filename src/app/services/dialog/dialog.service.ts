import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';

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
    this.dialogRef = this.dialog.open(AuthDialogComponent, {
      panelClass: 'custom-modalbox',
      width: '50vw',
      data: data,
    });

    this.dialogRef.afterClosed().subscribe(() => {
      // Handle any action after the dialog is closed
    });
  }

  closeDialog(): void {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
