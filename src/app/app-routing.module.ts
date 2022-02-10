import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditingComponent } from './editing/editing.component';
import { LoginComponent } from "./login/login.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: LoginComponent },
  { path: 'users', 
  children: [
    { path: '', component: UsersComponent},
    { path: ':id/edit', component: EditingComponent}
  ] 
},
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
