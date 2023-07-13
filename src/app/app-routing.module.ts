import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/products/add/add.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'home', component: DashboardComponent },
      {
        path: 'users',
        children: [
          { path: '', component: UsersComponent },
          { path: 'add', component: AddUserComponent },
        ],
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
