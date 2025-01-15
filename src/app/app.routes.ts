import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";
import {HomeComponent} from "./component/home/home.component";
import {CompetitionsComponent} from "./component/dashboard/competitions/competitions.component";
import {UsersComponent} from "./component/dashboard/users/users.component";
import {adminGuard} from "./guards/admin.guard";
import {SpeciesComponent} from "./component/dashboard/species/species.component";

export const routes: Routes = [
  {path: "", component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    canActivate :[adminGuard, authGuard],
    component: DashboardComponent,
    children: [
      { path: 'competitions', component: CompetitionsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'species', component: SpeciesComponent },

      { path: '', redirectTo: 'competitions', pathMatch: 'full' },
    ],
  },


];
