import { ResponseData } from './../../models/submission.model';
import { map } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { SubmissionService } from 'src/app/services/submission/submission.service';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.css'],
})
export class QuizEndComponent {
  uuid = uuidv4();
  userInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private submissionService: SubmissionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userInfoForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?7?\d{10,12}$/),
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      isChecked: [false],
    });
  }

  sendInfo() {
    if (this.userInfoForm.valid) {
      // sending answers to the server
      const responses = this.data.data.map(
        (item: { id: any; selected: number }) => {
          return <ResponseData>{
            question: item.id,
            answer: item.selected,
          };
        }
      );

      this.submissionService
        .postSubmission({
          username: this.userInfoForm.controls['username'].value,
          phone_number: this.userInfoForm.controls['phoneNumber'].value,
          is_consult: this.userInfoForm.controls['isChecked'].value,
          responses: responses,
        })
        .subscribe({
          next: () => {
            setTimeout(() => {
              this.dialogService.closeDialog();
              this.userInfoForm.reset();
            }, 100);
            setTimeout(() => {
              this.router.navigate(['/thank-you'], { relativeTo: this.route });
            }, 900);
          },
          error: () => {
            this.dialogService.closeDialog();
            setTimeout(() => {
              this.dialogService.openNotifyDialog(
                true,
                'Упс, серверная ошибка! Не смогли отправить результаты \
                опросника на сервер! Пожалуйста, попробуйте заново отправить!'
              );
            }, 100);
          },
        });
    } else {
      this.markFromGroupTouched(this.userInfoForm);
    }
  }

  markFromGroupTouched(fromGroup: FormGroup) {
    Object.values(fromGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFromGroupTouched(control);
      }
    });
  }
}
