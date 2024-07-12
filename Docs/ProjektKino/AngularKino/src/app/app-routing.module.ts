import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { MovieComponent } from './movie/movie.component';
import { SeatsComponent } from './seats/seats.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'profil',component: ProfilComponent},
  {path: 'movie',component:MovieComponent},
  {path: 'seats',component:SeatsComponent},
  {path: 'log-reg',component:LogRegComponent},
  {path: 'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
