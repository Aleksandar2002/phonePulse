import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './forms/create/create.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { adminGuard } from '../guards/admin.guard';
import { UpdateComponent } from './forms/update/update.component';

const routes: Routes = [
  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-page/create',
    component: CreateComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-page/edit/:id',
    component: UpdateComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
