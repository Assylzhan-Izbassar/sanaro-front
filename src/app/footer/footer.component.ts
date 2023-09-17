import { Component } from '@angular/core';
import { EmailsService } from '../services/emails/emails.service';
import { DialogService } from '../services/dialog/dialog.service';
import { DIRECTORY } from '../models/directory.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  emailValue: string = '';

  constructor(
    private emailsService: EmailsService,
    private dialogService: DialogService
  ) {}

  /**
   * Method then creates newsletter for the email to the user.
   */
  onEmailSent(): void {
    if (this.emailValue && this.isEmail(this.emailValue)) {
      this.emailsService
        .postEmailNewsletters({ email: this.emailValue })
        .subscribe({
          next: () => {
            this.dialogService.openNotifyDialog(false, DIRECTORY.call_back);
          },
          error: () => {
            this.dialogService.openNotifyDialog(
              true,
              DIRECTORY.error_sending_call_request
            );
          },
        });
    } else {
      this.dialogService.openNotifyDialog(
        true,
        DIRECTORY.error_sending_call_request
      );
    }
    this.emailValue = '';
  }

  private isEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }
}
