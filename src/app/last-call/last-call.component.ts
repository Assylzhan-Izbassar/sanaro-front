import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallsService } from '../services/calls/calls.service';
import { DialogService } from '../services/dialog/dialog.service';
import { DIRECTORY } from '../models/directory.model';

@Component({
  selector: 'app-last-call',
  templateUrl: './last-call.component.html',
  styleUrls: ['./last-call.component.css'],
})
export class LastCallComponent {
  callRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CallsService,
    private dialogService: DialogService
  ) {
    this.callRequestForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(17),
        ],
      ],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?7?\d{10,12}$/),
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  sendRequest() {
    if (this.callRequestForm.valid) {
      const formData = this.callRequestForm.value;

      this.service.postCallRequest(formData).subscribe({
        next: () => {
          this.dialogService.openNotifyDialog(false, DIRECTORY.call_back);
        },
        error: (e) => {
          console.log('Error when creating call request', e);
          if (e.status == 401) {
            this.dialogService.openNotifyDialog(true, DIRECTORY.unauthorized);
          } else if (e.status == 0 || e.status == 500) {
            this.dialogService.openNotifyDialog(true, DIRECTORY.server_error);
          }
        },
      });

      this.callRequestForm.reset();
    } else {
      // If we have not valid params, we will call the validations.
      this.markFromGroupTouched(this.callRequestForm);
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
