import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { ListSalasComponent } from './components/list-salas/list-salas.component';
import { AddEditSalaComponent } from './components/add-edit-sala/add-edit-sala.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListMoviesComponent,
    AddEditMovieComponent,
    ProgressBarComponent,
        ListSalasComponent,
    AddEditSalaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
     BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
       timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
