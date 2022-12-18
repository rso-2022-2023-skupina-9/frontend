import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PrimerjalnikComponent } from './primerjalnik/primerjalnik.component';
import { PrimerjalnikVrstaComponent } from './primerjalnik-vrsta/primerjalnik-vrsta.component';
import { PrimerjalnikTrgovinaComponent } from './primerjalnik-trgovina/primerjalnik-trgovina.component';
import { KosaricaComponent } from './kosarica/kosarica.component';
import { PriljubljeniIzdelkiComponent } from './priljubljeni-izdelki/priljubljeni-izdelki.component';
import { KosaricaIzdelekComponent } from './kosarica-izdelek/kosarica-izdelek.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'primerjalnik', component: PrimerjalnikComponent },
  { path: 'primerjalnik/vrsta/:id', component: PrimerjalnikVrstaComponent },
  { path: 'primerjalnik/trgovina/:id', component: PrimerjalnikTrgovinaComponent },
  { path: 'kosarica', component: KosaricaComponent },
  { path: 'kosarica/:id', component: KosaricaIzdelekComponent},
  { path: 'priljubljeni', component: PriljubljeniIzdelkiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
