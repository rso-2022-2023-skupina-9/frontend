import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OgrodjeComponent } from './ogrodje/ogrodje.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { PrimerjalnikComponent } from './primerjalnik/primerjalnik.component';
import { SpremeniVEvrePipe } from './spremeni-v-evre.pipe';

@NgModule({
  declarations: [
    OgrodjeComponent,
    LandingComponent,
    PrimerjalnikComponent,
    SpremeniVEvrePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }