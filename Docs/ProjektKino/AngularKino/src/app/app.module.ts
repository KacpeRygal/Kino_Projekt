import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { MovieComponent } from './movie/movie.component';
import { SeatsComponent } from './seats/seats.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OpinionRowComponent } from './opinion-row/opinion-row.component';
import { ScreeningRowComponent } from './screening-row/screening-row.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilComponent,
    LogRegComponent,
    MovieComponent,
    SeatsComponent,
    OpinionRowComponent,
    ScreeningRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
