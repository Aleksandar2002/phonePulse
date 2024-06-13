import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GenericsModule } from '../generics/generics.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthorizationRoutingModule } from './authorization-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, GenericsModule, ReactiveFormsModule, AuthorizationRoutingModule, RouterModule],
})
export class AuthorizationModule {}
