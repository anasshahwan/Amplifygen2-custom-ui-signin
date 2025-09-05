import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fetchUserAttributes, getCurrentUser, signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private router: Router) {}
  user: any = { email: '', name: '', companyName: '' };

  async ngOnInit() {
    const res = await fetchUserAttributes();
    console.log(res);
    this.user.email = res.email;
    this.user.name = res.preferred_username;
    this.user.companyName = res['custom:companyName'];
  }
  async signUserOut() {
    await signOut();
    this.router.navigate(['/signin']);
  }
}
