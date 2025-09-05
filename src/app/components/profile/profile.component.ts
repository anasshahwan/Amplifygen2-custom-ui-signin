import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  fetchUserAttributes,
  getCurrentUser,
  signOut,
  updateUserAttributes,
} from 'aws-amplify/auth';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private router: Router) {}
  user: any = { email: '', name: '', companyName: '' };

  isEditing: Boolean = false;
  newUserName = '';

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

  edit() {
    this.isEditing = true;

    this.newUserName = this.user.name;
  }
  saveUserAttributes() {
    this.isEditing = false;
    this.updateUserAttr(this.newUserName);
    this.user.name = this.newUserName;
  }

  async updateUserAttr(newUserName: string) {
    const result = await updateUserAttributes({
      userAttributes: { preferred_username: newUserName },
    });
    console.log(result);
  }
}
