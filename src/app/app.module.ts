import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OgrodjeComponent } from './ogrodje/ogrodje.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { PrimerjalnikComponent } from './primerjalnik/primerjalnik.component';
import { SpremeniVEvrePipe } from './spremeni-v-evre.pipe';
import { SpremeniDatumPipe } from './spremeni-datum.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimerjalnikVrstaComponent } from './primerjalnik-vrsta/primerjalnik-vrsta.component';
import { PrimerjalnikTrgovinaComponent } from './primerjalnik-trgovina/primerjalnik-trgovina.component';
import { KosaricaComponent } from './kosarica/kosarica.component';
import { PriljubljeniIzdelkiComponent } from './priljubljeni-izdelki/priljubljeni-izdelki.component';
import { KosaricaIzdelekComponent } from './kosarica-izdelek/kosarica-izdelek.component';

@NgModule({
  declarations: [
    OgrodjeComponent,
    LandingComponent,
    PrimerjalnikComponent,
    SpremeniVEvrePipe,
    SpremeniDatumPipe,
    PrimerjalnikVrstaComponent,
    PrimerjalnikTrgovinaComponent,
    KosaricaComponent,
    PriljubljeniIzdelkiComponent,
    KosaricaIzdelekComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }