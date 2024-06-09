import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { GenericsModule } from '../generics/generics.module';
import { CreateComponent } from './forms/create/create.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UpdateComponent } from './forms/update/update.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminPageComponent, CreateComponent, UpdateComponent],
  imports: [CommonModule, GenericsModule, AdminRoutingModule, RouterModule],
})
export class AdminModule {}
