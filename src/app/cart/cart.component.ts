import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ICartItem, IPhoneInCart } from '../interfaces/ICartItem';
import { CartService } from '../services/cart.service';
import { AuthorizationService } from '../services/authorization.service';
import { IUser } from '../interfaces/UserInterface';
import { PhonesService } from '../services/phones.service';
import { PopupControlService } from '../services/popup-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'phone-pulse-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit ,OnDestroy {
  constructor(
    private cartService: CartService,
    private authService: AuthorizationService,
    private phoneService: PhonesService,
    private popupService: PopupControlService,
  ) {}

  phonesInCart!: IPhoneInCart[];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    if (this.authService.LoggedUser) {
      this.getAllUserCartItems(this.authService.LoggedUser.id);
    }

    this.subscriptions.push(
        this.authService.loggedUserSubject.subscribe((user: IUser | null) => {
            if (user == null) {
              return;
            }
            this.getAllUserCartItems(user.id);
          })
    );
  }

  getAllUserCartItems(userId: string): void {
    this.subscriptions.push(    
        this.cartService
        .getUserCartItems()
        .subscribe((userCartItems: ICartItem[] | null) => {
          if (userCartItems && userCartItems.length) {
            this.transferArrayOfProductIdsToProductsArray(userCartItems);
          }
        }));
  }

  transferArrayOfProductIdsToProductsArray(userCartItems: ICartItem[]) {
    this.subscriptions.push(
        this.phoneService
        .transferArrayOfIdsToPhoneObjectsArray(userCartItems)
        .subscribe((data: IPhoneInCart[] | null) => {
          if (data) {
            this.phonesInCart = data;
          }
        })
    );
  }

  removeFromCart(phoneId: string): void {
    this.phonesInCart.forEach((phone: IPhoneInCart, index: number) => {
      if (phone.id == phoneId) this.phonesInCart.splice(index, 1);
    });

    let cartItems = this.mapPhonesInCartToCartItemsArray(phoneId);
    this.subscriptions.push(    
      this.cartService.removeFromCart({ cart: cartItems }).subscribe(() => {
          this.popupService.show('Phone is removed from cart', 'success');
      }));
  }

  changeQuantity(quantity: string, phoneId: string): void {
    let quantityInt: number = parseInt(quantity);

    if (isNaN(quantityInt) || quantityInt <= 0 || quantityInt > 100) {
      this.popupService.show(
        'Quantity must be greater than 0 and lower than 100',
        'error'
      );
      return;
    }

    let cartItems = this.mapPhonesInCartToCartItemsArray(phoneId, quantityInt);

    this.changeQuantityForPhonesInCart(cartItems);

    this.subscriptions.push(    
      this.cartService.changeQuantity({ cart: cartItems }).subscribe(() => {
          this.popupService.show('Quantity is changed', 'success');
      }));
  }

  mapPhonesInCartToCartItemsArray(phoneId: string, quantityInt: number = 0) {
    return this.phonesInCart.map((item) => {
      let obj: ICartItem = {
        phoneId: item.id,
        quantity: item.quantity,
      };
      if (item.id == phoneId && quantityInt) {
        obj.quantity = quantityInt;
      }
      return obj;
    });
  }

  changeQuantityForPhonesInCart(cartItems: ICartItem[]): void {
    this.phonesInCart.forEach((phone) => {
      let cartItem = cartItems.find((x) => x.phoneId == phone.id);
      if (cartItem) {
        phone.quantity = cartItem.quantity;
      }
    });
  }

  get getTotalPrice(): number {
    if (this.phonesInCart && this.phonesInCart.length) {
      let sum = 0;
      this.phonesInCart.forEach((item) => {
        sum += item.discount
          ? item.price * item.quantity * (1 + +item.discount / 100)
          : +item.price * item.quantity;
      });
      return sum;
    }
    return 0;
  }

  get getTotalQuantity(): number {
    return this.phonesInCart.reduce(
      (accumulator, currentValue) => accumulator + +currentValue.quantity,
      0
    );
  }

  buyPhones() {
    this.subscriptions.push(    
        this.makeOrder().subscribe(() => {
            this.subscriptions.push(
                this.clearCart().subscribe(() => {
                    this.phonesInCart = [];
                    this.popupService.show('Your order has been made', 'success');
                })
            );
      }));
    this.clearCart();
  }

  makeOrder() {
    let cart: ICartItem[] = this.phonesInCart.map((x) => {
      return { quantity: x.quantity, phoneId: x.id } as ICartItem;
    });

    let orders = {
      orders: [
        {
          orderDate: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
          items: cart,
        },
      ],
    };

    return this.cartService.makeOrder(orders);
  }

  clearCart() {
    return this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((u) => u.unsubscribe());
  }
}
