import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hub } from 'aws-amplify/utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'amplifygen2-custom-ui-login';

  ngOnInit() {
    Hub.listen('auth', ({ payload }) => {
      // console.log(payload.event);
      switch (payload.event) {
        case 'signedIn':
          console.log('User signed in..');
          break;
        case 'signedOut':
          console.log('User signed out..');
          break;
        case 'signInWithRedirect':
          console.log('User signed in using third party provider.');
          break;
        default:
          console.log('Unhandled auth event:', payload.event);
      }
    });
  }
}
