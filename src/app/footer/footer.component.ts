import { Component } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { DIRECTORY } from '../models/directory.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  emailValue: string = '';

  constructor(private dialogService: DialogService) {}

  /**
   * Method then creates newsletter for the email to the user.
   */
  onEmailSent(): void {
    if (this.emailValue && this.isEmail(this.emailValue)) {
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
