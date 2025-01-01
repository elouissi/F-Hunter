import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";
import {HomeComponent} from "./component/home/home.component";
import {CompetitionsComponent} from "./component/dashboard/competitions/competitions.component";
import {UsersComponent} from "./component/dashboard/users/users.component";

export const routes: Routes = [
  {path: "", component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'competitions', component: CompetitionsComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'competitions', pathMatch: 'full' },
    ],
  },


];
