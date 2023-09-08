import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { DialogService } from '../services/dialog/dialog.service';
import { DIRECTORY } from '../models/directory.model';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent {
  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(10)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private dialog: DialogService
  ) {}

  register() {
    console.log('In register');
    if (this.registerForm.valid) {
      let registerData = this.registerForm.value;
      console.log('Valid');
      this.service.register(registerData).subscribe({
        next: () => {
          this.dialog.closeDialog();

          setTimeout(() => {
            this.dialog.openNotifyDialog(false, DIRECTORY.register_success);
          }, 100);
        },
        error: (error) => {
          console.log('Error when registering a new user.', error);
        },
      });
    }
  }
}
