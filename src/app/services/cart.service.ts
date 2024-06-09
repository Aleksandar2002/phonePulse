import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { UsersService } from './users.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { PopupControlService } from './popup-control.service';
import { ICartItem } from '../interfaces/ICartItem';
import { IUser } from '../interfaces/UserInterface';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  constructor(
    private http: HttpClient,
    private authService: AuthorizationService,
    private userService: UsersService,
    private popupService: PopupControlService
  ) {}
  subscriptions: Subscription[] = [];
  baseUrl: string = 'http://localhost:3000/users';

  addPhoneToCart(cart: any): Observable<any> {
    return this.http.patch(this.baseUrl + `/${this.getLoggedUserId}`, cart);
  }

  changeQuantity(cart: any) {
    return this.changeCart(cart);
  }

  removeFromCart(cart: any) {
    return this.changeCart(cart);
  }

  changeCart(cart: any) {
    return this.http.patch(this.baseUrl + '/' + this.getLoggedUserId, cart);
  }

  clearCart() {
    return this.changeCart({ cart: [] });
  }

  makeOrder(orders: any) {
    return this.http.patch(this.baseUrl + '/' + this.getLoggedUserId, orders);
  }

  getUserCartItems(): Observable<ICartItem[] | null> {
    if (this.getLoggedUserId) {
      return this.http
        .get<IUser>(this.baseUrl + '/' + this.getLoggedUserId)
        .pipe(
          map((user: IUser) => {
            let cartItems: ICartItem[] = [];
            cartItems.push(...(user.cart || []));
            return cartItems;
          })
        );
    }
    return of(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  get getLoggedUserId(): string {
    return this.authService.LoggedUser?.id as string;
  }
}
