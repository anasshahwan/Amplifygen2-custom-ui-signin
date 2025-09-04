import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmSignUpComponent } from './components/confirm-sign-up/confirm-sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'confirm-signup', component: ConfirmSignUpComponent },
  { path: 'profile', component: ProfileComponent },
];
