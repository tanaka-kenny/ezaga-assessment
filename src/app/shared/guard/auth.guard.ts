import { CanActivateFn, Router } from '@angular/router';
import { getAccessToken } from '../utils/local-storage.utils';
import { inject } from '@angular/core';



export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (getAccessToken()) {
    return true
  }

  router.navigate(['login'])
  return false;
};
