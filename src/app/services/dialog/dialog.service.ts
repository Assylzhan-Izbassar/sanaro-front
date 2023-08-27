import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      panelClass: 'custom-modalbox',
      width: '50vw',
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any action after the dialog is closed
    });
  }
}
