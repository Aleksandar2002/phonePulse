import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhonesComponent } from './phones.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { CartComponent } from '../cart/cart.component';
import { authorizedUserGuard } from '../guards/authorized-user.guard';


const routes: Routes = [
    {
        path: 'phones',
        component: PhonesComponent,
      },
      {
        path: 'phones/:id',
        component:PhoneDetailsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [authorizedUserGuard],
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhonesRoutingModule {}
