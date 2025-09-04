import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Form Data:', this.signUpForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
