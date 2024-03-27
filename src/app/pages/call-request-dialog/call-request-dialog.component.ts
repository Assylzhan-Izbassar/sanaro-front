import { Component, Inject } from '@angular/core';
import { CallsService } from '../../services/calls/calls.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../services/dialog/dialog.service';
import { DIRECTORY } from '../../models/directory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.callRequestForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?7?\d{10,12}$/),
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      reason: ['', []],
    });
  }

  onSubmit() {
    if (this.callRequestForm.valid) {
      const formData = this.callRequestForm.value;
      if (this.data['reason']) {
        formData['reason'] += ' ' + this.data['reason'];
      }

      this.service.postCallRequest(formData).subscribe({
        next: (response: any) => {
          this.dialog.closeDialog();
          this.router.navigate(['/thank-you'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log('Error when creating call request', error);
          this.dialog.closeDialog();
          this.dialog.openNotifyDialog(
            true,
            DIRECTORY.error_sending_call_request
          );
        },
      });
    } else {
      console.log('Invalid form data!');
    }
  }
}
