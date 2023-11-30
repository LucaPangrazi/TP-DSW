// Importa NgModule desde '@angular/core'
import { NgModule } from '@angular/core';

// Importa BrowserModule, BrowserAnimationsModule desde '@angular/platform-browser'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importa ReactiveFormsModule, HTTP_INTERCEPTORS desde '@angular/forms' y '@angular/common/http' respectivamente
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Importa HttpClientModule desde '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';

// Importa ToastrModule desde 'ngx-toastr'
import { ToastrModule } from 'ngx-toastr';

// Importa AppRoutingModule desde './app-routing.module'
import { AppRoutingModule } from './app-routing.module';

// Importa AppComponent y otros componentes desde sus respectivas rutas
import { AppComponent } from './app.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { AddEditSalaComponent } from './components/add-edit-sala/add-edit-sala.component';
import { AddEditSucursalComponent } from './components/add-edit-sucursal/add-edit-sucursal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { ListSalasComponent } from './components/list-salas/list-salas.component';
import { ListSucursalesComponent } from './components/list-sucursales/list-sucursales.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

// Importa AddTokenInterceptor desde './util/add-token.interceptor'
import { AddTokenInterceptor } from './util/add-token.interceptor';

@NgModule({
  declarations: [
    AddEditMovieComponent,
    AddEditSalaComponent,
    AddEditSucursalComponent,
    AppComponent,
    DashboardComponent,
    ListMoviesComponent,
    ListSalasComponent,
    ListSucursalesComponent,
    LoginComponent,
    NavbarComponent,
    ProgressBarComponent,
    RegisterComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
