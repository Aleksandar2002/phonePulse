import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { PhonesModule } from './phones/phones.module';
import { HomeModule } from './home/home.module';
import { FixedModule } from './fixed/fixed.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { GenericsModule } from './generics/generics.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AdminModule } from './admin/admin.module';
import { BannerComponent } from './shared/banner/banner.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ContactComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    PhonesModule,
    HomeModule,
    FixedModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    GenericsModule,
    AuthorizationModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
