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
  callRequestForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    phone_number: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(12)],
    ],
    city: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private service: CallsService,
    private dialogService: DialogService
  ) {}

  sendRequest() {
    if (this.callRequestForm.valid) {
      const formData = this.callRequestForm.value;

      this.service.postCallRequest(formData).subscribe({
        next: (response: any) => {
          if (response.id) {
            this.dialogService.openNotifyDialog(false, DIRECTORY.call_back);
          } else {
            this.dialogService.openNotifyDialog(true, DIRECTORY.error_sending_call_request);
          }
        },
        error: (e) => console.log('Error when creating call request', e),
      });

      this.callRequestForm.setValue({
        username: '',
        phone_number: '',
        city: '',
      });
    }
  }
}
