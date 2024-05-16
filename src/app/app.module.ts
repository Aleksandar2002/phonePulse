import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { PhonesModule } from './phones/phones.module';
import { HomeModule } from './home/home.module';
import { HeaderComponent } from './fixed/header/header.component';
import { FooterComponent } from './fixed/footer/footer.component';
import { FixedModule } from './fixed/fixed.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhonesModule,
    HomeModule,
    FixedModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
