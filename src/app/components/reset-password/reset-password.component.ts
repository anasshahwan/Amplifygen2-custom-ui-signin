import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { confirmResetPassword, resetPassword } from 'aws-amplify/auth';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  userEmail = '';
  otpForm: FormGroup;

  showOtpForm: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
    this.otpForm = this.fb.group({
      otpCode: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { email } = this.resetPasswordForm.value;
      console.log(email);
      const result = await resetPassword({ username: email });
      console.log(result);
      this.showOtpForm = true;
      //  this.verifyUserEmail(this.userEmail, confirmedCode);
    } else {
      console.log('Form is invalid');
    }
  }

  async onResetPassword() {
    const data = {
      email: this.resetPasswordForm.value.email,
      otp: this.otpForm.value.otpCode,
      newPassword: this.otpForm.value.newPassword,
    };
    console.log(data);
    const results = await confirmResetPassword({
      username: data.email,
      confirmationCode: data.otp,
      newPassword: data.newPassword,
    });

    this.router.navigate(['/signin']);
    console.log(results);
  }
}
