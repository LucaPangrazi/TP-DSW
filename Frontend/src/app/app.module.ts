import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { SecondNavbarComponent } from './components/second-navbar/second-navbar.component';
import { ListSalasComponent } from './components/list-salas/list-salas.component';
import { AddEditSalaComponent } from './components/add-edit-sala/add-edit-sala.component';
import { ListSucursalesComponent } from './components/list-sucursales/list-sucursales.component';
import { AddEditSucursalComponent } from './components/add-edit-sucursal/add-edit-sucursal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { DetallesPeliculaComponent } from './components/detalles-pelicula/detalles-pelicula.component';

// Servicios
import { SearchService } from './shared/search.service';
import { AddTokenInterceptor } from './util/add-token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ComprarEntradaComponent } from './components/comprar-entrada/comprar-entrada.component';
import { SeleccionAsientosComponent } from './components/seleccion-asientos/seleccion-asientos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SecondNavbarComponent,
    ListMoviesComponent,
    AddEditMovieComponent,
    ProgressBarComponent,
    ListSalasComponent,
    AddEditSalaComponent,
    ListSucursalesComponent,
    AddEditSucursalComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SpinnerComponent,
    ListUsersComponent,
    EditUserComponent,
    CarteleraComponent,
    DetallesPeliculaComponent,
    ComprarEntradaComponent,
    SeleccionAsientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
  ],
  providers: [
    SearchService, 
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
