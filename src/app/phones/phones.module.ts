import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonesComponent } from './phones.component';
import { PhoneComponent } from './phone/phone.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { DiscountComponent } from './discount/discount.component';
import { CartModule } from '../cart/cart.module';
import { PhonesRoutingModule } from './phonse-routing.module';

@NgModule({
  declarations: [
    PhonesComponent,
    PhoneComponent,
    SearchComponent,
    PhoneDetailsComponent,
    DiscountComponent,
  ],
  imports: [FormsModule, CommonModule, CartModule, PhonesRoutingModule],
})
export class PhonesModule {}
