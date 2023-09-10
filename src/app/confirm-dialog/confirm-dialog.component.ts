import { Component } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { DIRECTORY } from '../models/directory.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  animations: [
    trigger('emailAnimation', [
      state('email_visible', style({ maxHeight: '250px'})),
      state('email_hidden', style({ maxHeight: '0px' })),
      transition(
        'email_hidden => email_visible',
        animate('500ms ease-in-out'),
      ),
    ]),
  ],
})
export class ConfirmDialogComponent {
  emailValue: string = '';
  emailVisible: boolean = false;
  clicked: boolean = false;

  constructor(private dialogService: DialogService) {}

  onConfirm(event: EventTarget, isEmail: boolean): void {
    if(isEmail) {
      this.clicked = true;
      (event as Element).classList.add('dialog__btn_selected');
      this.dialogService.closeDialog();
      setTimeout(() => {
        // !!! Here we should call the request of sending email !!!
        this.dialogService.openNotifyDialog(false, DIRECTORY.call_back);
      }, 200);
    } else {
      (event as Element).classList.add('dialog__btn_selected');
      this.clicked = true;
      this.emailVisible = true;
    }
  }

  onKey(target: EventTarget): void {
    this.emailValue = (target as HTMLTextAreaElement).value;
  }

  onContinue(): void {
    // console.log(this.emailValue);
    this.dialogService.closeDialog();
    setTimeout(() => {
      // !!! Here we should call the request of sending email !!!
      this.dialogService.openNotifyDialog(false, DIRECTORY.call_back);
    }, 200);
  }
}
