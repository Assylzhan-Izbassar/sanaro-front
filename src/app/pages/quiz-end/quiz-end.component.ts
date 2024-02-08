import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.css'],
})
export class QuizEndComponent {
  userInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
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
      isChecked: ['true'],
    });
  }

  sendInfo() {
    if (this.userInfoForm.valid) {
      setTimeout(() => {
        this.dialogService.closeDialog();
        this.userInfoForm.reset();
      }, 100);
      setTimeout(() => {
        this.router.navigate(['/thank-you'], { relativeTo: this.route });
      }, 900);
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
