import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PhonesComponent } from './phones/phones.component';
import { PhoneDetailsComponent } from './phones/phone-details/phone-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { guestGuard } from './guards/guest.guard';
import { CartComponent } from './cart/cart.component';
import { authorizedUserGuard } from './guards/authorized-user.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'phones',
    component: PhonesComponent,
  },
  {
    path: 'phones/:id',
    component: PhoneDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authorizedUserGuard],
  },

  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
