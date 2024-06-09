import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { GenericsModule } from '../generics/generics.module';
import { AddToCartButtonComponent } from './add-to-cart-button/add-to-cart-button.component';

@NgModule({
  declarations: [CartComponent, AddToCartButtonComponent],
  imports: [CommonModule, GenericsModule],
  exports: [AddToCartButtonComponent],
})
export class CartModule {}
