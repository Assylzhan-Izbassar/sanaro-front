import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { DialogService } from '../services/dialog/dialog.service';
import { SharedService } from '../services/core/shared.service';
import { DIRECTORY } from '../models/directory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireResponseService } from '../services/questionnaire-response/questionnaire-response.service';
import { WaitingService } from '../services/core/waiting.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthDialogComponent {
  authForm: FormGroup;
  user_id?: number;

  constructor(
    private authService: AuthService,
    private waitingService: WaitingService,
    private dialogService: DialogService,
    private sharedService: SharedService,
    private questionnareResponseService: QuestionnaireResponseService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9_-]{4,29}$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  /**
   * Shared service to send data to siblings.
   * @param data - Any data.
   */
  sendDataToHeader(data: any) {
    this.sharedService.sendData(data);
  }

  /**
   * Logins to the system.
   */
  public login() {
    if (this.authForm.valid) {
      let formData = this.authForm.value;

      this.authService.login(formData).subscribe({
        next: async (response: any) => {
          if (response.access) {
            this.sendDataToHeader(true);
            this.dialogService.closeDialog();

            const p = this.authService.getCurrentUserInfo();
            await this.waitingService.waitFor(p).then((item) => {
              this.user_id = item?.id;
            });

            // sending collected questionnaire responses
            if (this.user_id) {
              let response =
                this.questionnareResponseService.postQuestionnaireResponses(
                  this.user_id
                ); // sending questionnaire responses to the server
              if (response) {
                this.dialogService.openConfirmDialog({}); // opens confirmation dialog
              } else {
                this.dialogService.openNotifyDialog(
                  true,
                  'Упс, серверная ошибка! Не смогли отправить результаты опросника на сервер!'
                );
              }
            } else {
              this.dialogService.openNotifyDialog(
                true,
                'Упс! ID пользователя не найден!'
              );
            }
          }
        },
        error: (error) => {
          console.log('Login error:', error);
          this.dialogService.closeDialog();
          setTimeout(() => {
            this.dialogService.openNotifyDialog(
              true,
              DIRECTORY.error_sending_call_request
            );
          }, 300);
        },
      });
    } else {
      this.markFormGroupTouched(this.authForm);
    }
  }

  /**
   * Opens registration dialog.
   */
  openRegisterDialog() {
    this.dialogService.closeDialog();
    setTimeout(() => {
      this.dialogService.openRegisterDialog(null);
    }, 100);
  }

  private markFormGroupTouched(fromGroup: FormGroup) {
    Object.values(fromGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
