import { Component } from '@angular/core';
import { CallsService } from '../services/calls/calls.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog/dialog.service';
import { DIRECTORY } from '../models/directory.model';

@Component({
  selector: 'app-call-request-dialog',
  templateUrl: './call-request-dialog.component.html',
  styleUrls: ['./call-request-dialog.component.css'],
})
export class CallRequestDialogComponent {
  callRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CallsService,
    private dialog: DialogService
  ) {
    this.callRequestForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(12)],
      ],
      city: ['', [Validators.required, Validators.minLength(3)]],
      reason: ['', []],
    });
  }

  onSubmit() {
    if (this.callRequestForm.valid) {
      const formData = this.callRequestForm.value;

      this.service.postCallRequest(formData).subscribe({
        next: (response: any) => {
          this.dialog.closeDialog();
          if (response.id) {
            this.dialog.openNotifyDialog(false, DIRECTORY.call_back);
          } else {
            this.dialog.openNotifyDialog(
              true,
              DIRECTORY.error_sending_call_request
            );
          }
        },
        error: (error) =>
          console.log('Error when creating call request', error),
      });
    }
  }
}
