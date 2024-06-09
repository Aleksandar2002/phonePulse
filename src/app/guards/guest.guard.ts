import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

export const guestGuard: CanActivateFn = (route, state) => {
  let user = JSON.parse(localStorage.getItem('LOGGED_USER') as string);

  return user ? inject(Router).createUrlTree(['/phones']) : true;
};
