import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NoAuthGuard } from './shared/guards/no-auth.guard';

const routes: Routes = [
  {
    path:'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: { name: 'home' }
  },
  {
    path:'auth/login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
    data: { name: 'login' }
  },
  {
    path:'auth/register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
    data: { name: 'register' }
  },
  {
    path:'**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
