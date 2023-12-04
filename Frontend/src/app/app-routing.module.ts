// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListSucursalesComponent } from './components/list-sucursales/list-sucursales.component';
import { AddEditSucursalComponent } from './components/add-edit-sucursal/add-edit-sucursal.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { ListSalasComponent } from './components/list-salas/list-salas.component';
import { AddEditSalaComponent } from './components/add-edit-sala/add-edit-sala.component';
import { HomeComponent } from './components/HomeCine/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AuthGuard } from './util/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { showSecondNavbar: true }  },
  { path: 'home', component: HomeComponent, data: { showSecondNavbar: true } },
  { path: 'movies', component: ListMoviesComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'movies/add', component: AddEditMovieComponent, data: { showSecondNavbar: true }  },
  { path: 'movies/edit/:id_movie', component: AddEditMovieComponent, data: { showSecondNavbar: true }  },
  { path: 'salas', component: ListSalasComponent },
  { path: 'salas/add', component: AddEditSalaComponent, data: { showSecondNavbar: true }  },
  { path: 'salas/edit/:id', component: AddEditSalaComponent, data: { showSecondNavbar: true }  },
  { path:'sucursales', component: ListSucursalesComponent},
  { path: 'sucursales/add', component:AddEditSucursalComponent, data: { showSecondNavbar: true } },
  { path: 'sucursales/edit/:id', component: AddEditSucursalComponent, data: { showSecondNavbar: true } },
  { path: 'login', component: LoginComponent, data: { showSecondNavbar: true }  },
  { path: 'register', component: RegisterComponent, data: { showSecondNavbar: true }  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
