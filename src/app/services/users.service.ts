import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/UserInterface';
import { ICartItem } from '../interfaces/ICartItem';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private authService: AuthorizationService
  ) {}
  loggedUserId!: string | undefined;

  getUserCart(): Observable<ICartItem[] | null> {
    this.loggedUserId = this.authService.LoggedUser?.id;

    if (this.loggedUserId) {
      return this.http
        .get<IUser>('http://localhost:3000/users/' + this.loggedUserId)
        .pipe(
          map((user: IUser) => {
            return user.cart;
          })
        ) as Observable<ICartItem[]>;
    }
    return of(null);
  }
}
