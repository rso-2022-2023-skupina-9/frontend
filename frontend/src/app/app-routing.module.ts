import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PrimerjalnikComponent } from './primerjalnik/primerjalnik.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'primerjalnik', component: PrimerjalnikComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
