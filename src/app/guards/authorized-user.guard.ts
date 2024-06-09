import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '../interfaces/UserInterface';

export const authorizedUserGuard: CanActivateFn = (route, state) => {
  let user = JSON.parse(localStorage.getItem('LOGGED_USER') as string) as IUser;

  return user && user.role == 'user'
    ? true
    : inject(Router).createUrlTree(['/phones']);
};
