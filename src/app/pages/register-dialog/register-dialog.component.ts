import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { DIRECTORY } from '../../models/directory.model';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('passwordConfirm')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
};

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent {
  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z0-9_-]{4,29}$/)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validator: passwordMatchValidator }
  );

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private dialog: DialogService
  ) {}

  register() {
    if (this.registerForm.valid) {
      let registerData = this.registerForm.value;

      this.service.register(registerData).subscribe({
        next: () => {
          this.dialog.closeDialog();

          setTimeout(() => {
            this.dialog.openNotifyDialog(false, DIRECTORY.register_success);
          }, 100);

          setTimeout(() => {
            this.dialog.closeDialog();
          }, 1000);
          setTimeout(() => {
            this.dialog.openAuthDialog({});
          }, 1100);
        },
        error: (error) => {
          console.log('Error when registering a new user.', error);
        },
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
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
