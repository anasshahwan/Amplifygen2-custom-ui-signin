import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { fetchAuthSession } from 'aws-amplify/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const session = await fetchAuthSession();
  if (session.tokens != undefined) {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
