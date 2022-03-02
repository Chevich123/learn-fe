import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditingComponent } from './editing/editing.component';
import { LoggedInGuard } from './guard/loggedInGuard';
import { AuthGuard } from './guard/authGuard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'newUser', component: CreateUserComponent, canActivate: [LoggedInGuard] },
  {
    path: 'users',
    canActivate: [LoggedInGuard],
    children: [
      { path: '', component: UsersComponent },
      { path: ':id/edit',  component: EditingComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
