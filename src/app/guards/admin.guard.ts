import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '../interfaces/UserInterface';

export const adminGuard: CanActivateFn = (route, state) => {
  let user: IUser = JSON.parse(
    localStorage.getItem('LOGGED_USER') as string
  ) as IUser;

  return user && user.role == 'admin'
    ? true
    : inject(Router).createUrlTree(['/phones']);
};
