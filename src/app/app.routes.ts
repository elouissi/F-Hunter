import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";
import {HomeComponent} from "./component/home/home.component";

export const routes: Routes = [
  {path: "", component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [authGuard]  },
  {path: 'home', component: HomeComponent },


];
