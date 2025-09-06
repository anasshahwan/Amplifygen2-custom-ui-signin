import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { signIn, signInWithRedirect } from 'aws-amplify/auth';
@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.signInForm.valid) {
      console.log('Form Data:', this.signInForm.value);

      const { email, password } = this.signInForm.value;
      this.loginUser(email, password);
    } else {
      console.log('Form is invalid');
    }
  }

  async loginUser(email: string, password: string) {
    const { nextStep } = await signIn({ username: email, password: password });
    //console.log(res);
    if (nextStep.signInStep == 'DONE') {
      this.router.navigate(['/profile']);
    }
  }

  async signInWithGoogle() {
    await signInWithRedirect({ provider: 'Google' });
  }
}
