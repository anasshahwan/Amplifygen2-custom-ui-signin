import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { confirmSignUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-confirm-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.scss',
})
export class ConfirmSignUpComponent {
  confirmSignUpForm: FormGroup;
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.confirmSignUpForm = this.fb.group({
      confirmedCode: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    this.userEmail = navigation?.extras?.state?.['email'];
  }

  onSubmit(): void {
    if (this.confirmSignUpForm.valid) {
      const { confirmedCode } = this.confirmSignUpForm.value;
      console.log(confirmedCode);
      this.verifyUserEmail(this.userEmail, confirmedCode);
    } else {
      console.log('Form is invalid');
    }
  }

  async verifyUserEmail(email: string, code: string) {
    const { nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    console.log(nextStep);
    if (nextStep.signUpStep == 'DONE') {
      this.router.navigate(['/signin']);
    }
  }
}
