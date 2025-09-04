import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { signUp } from 'aws-amplify/auth';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Form Data:', this.signUpForm.value);
      const { email, companyName, name, password } = this.signUpForm.value;
      this.createNewUser(email, password, name, companyName);
    } else {
      console.log('Form is invalid');
    }
  }
  async createNewUser(
    email: string,
    password: string,
    name: string,
    companyName: string,
  ) {
    const { nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          preferred_username: name,
          'custom:companyName': companyName,
        },
      },
    });
    if (nextStep.signUpStep == 'CONFIRM_SIGN_UP') {
      this.router.navigate(['/confirm-signup'], { state: { email: email } });
    }

    //console.log(res);
  }
}
