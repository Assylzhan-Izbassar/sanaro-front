import { EmailsService } from '../../services/emails/emails.service';
import { Component } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { DIRECTORY } from '../../models/directory.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  animations: [
    trigger('emailAnimation', [
      state('email_visible', style({ maxHeight: '250px', overflow: 'visible' })),
      state('email_hidden', style({ maxHeight: '0px', overflow: 'hidden' })),
      transition('email_hidden => email_visible', animate('500ms ease-in-out')),
    ]),
  ],
})
export class ConfirmDialogComponent {
  emailValue: string = '';
  emailVisible: boolean = false;
  clicked: boolean = false;

  constructor(
    private dialogService: DialogService,
    private emailsService: EmailsService
  ) {}

  onConfirm(event: EventTarget, isEmail: boolean): void {
    if (isEmail) {
      this.clicked = true;
      (event as Element).classList.add('dialog__btn_selected');
      this.dialogService.closeDialog();
      setTimeout(() => {
        // calling the email sending method.
        this.emailsService.postEmailTracking({}).subscribe({
          next: () => {
            this.dialogService.openNotifyDialog(false, DIRECTORY.call_back);
          },
          error: (error) => {
            this.dialogService.openNotifyDialog(true, DIRECTORY.error_sending_call_request);
            console.log(error);
          },
        });
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
      // calling the email sending method.
      this.emailsService.postEmailTracking({ email: this.emailValue }).subscribe({
        next: () => {
          this.dialogService.openNotifyDialog(false, DIRECTORY.call_back);
        },
        error: (error) => {
          this.dialogService.openNotifyDialog(true, DIRECTORY.error_sending_call_request);
          console.log(error);
        },
      });
    }, 200);
  }
}
