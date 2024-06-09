import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PopupControlService } from '../../services/popup-control.service';
import { UsersService } from '../../services/users.service';
import { ICartItem } from '../../interfaces/ICartItem';
import { IUser } from '../../interfaces/UserInterface';
import { AuthorizationService } from '../../services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'phone-pulse-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
})
export class AddToCartButtonComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private popupService: PopupControlService,
    private userService: UsersService,
    private authService: AuthorizationService
  ) {}

  @Input() loggedUser: IUser | null = null;
  @Input() phoneId: string = '';
  subscriptions: Subscription[] = [];

  addToCart(phoneId: string) {
    this.userService.getUserCart().subscribe((data: ICartItem[] | null) => {
      // this.popupService.hide();

      if (data == null) {
        return;
      }

      if (data.find((x) => x.phoneId == phoneId)) {
        this.popupService.show('Phone is already in the cart', 'error');
        return;
      }

      let cart = { cart: [...data, { phoneId: phoneId, quantity: 1 }] };
      this.cartService.addPhoneToCart(cart).subscribe(() => {
        this.popupService.show('Phone is added to the cart', 'success');
      });
    });
  }

  ngOnInit(): void {
    if (this.authService.LoggedUser != null) {
      this.loggedUser = this.authService.LoggedUser;
    }
    this.subscriptions.push(
      this.authService.loggedUserSubject.subscribe((user: IUser | null) => {
        this.loggedUser = user;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((u) => u.unsubscribe());
  }
}
