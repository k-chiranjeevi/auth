import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { SigninGuard } from './guards/signin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [SigninGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [SigninGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
