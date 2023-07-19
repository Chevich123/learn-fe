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
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login | Workshop #3',
      },

      {
        path: 'products',
        children: [
          {
            path: 'add',
            component: AddProductComponent,
            title: 'New product | Workshop #3',
          },
          {
            path: '',
            component: ProductsComponent,
            pathMatch: 'full',
            title: 'Products | Workshop #3',
          },
        ],
      },

      {
        path: 'home',
        component: DashboardComponent,
        title: 'Home | Workshop #3',
      },

      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent,
            title: 'Users | Workshop #3',
          },
          {
            path: 'add',
            component: AddUserComponent,
            title: 'New user | Workshop #3',
          },
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
