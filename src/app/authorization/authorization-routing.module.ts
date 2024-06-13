import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { guestGuard } from '../guards/guest.guard';
import { RegisterComponent } from './register/register.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
