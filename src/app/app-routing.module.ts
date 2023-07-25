import { Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/products/add/add.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { Title } from '@angular/platform-browser';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { EditingComponent } from './pages/products/editing/editing.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} | Workshop #3`);
    } else {
      this.title.setTitle('Workshop #3');
    }
  }
}

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: WrapperComponent,
    children: [
      {
        path: 'login',
        canActivate: [loginGuard],
        component: LoginComponent,
        title: 'Login',
      },

      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsComponent,
            pathMatch: 'full',
            title: 'Products',
          },
          {
            path: 'add',
            component: AddProductComponent,
            title: 'New product',
          },
          {
            path: 'edit/:id',
            component: EditingComponent,
          },
        ],
      },

      {
        path: 'home',
        component: DashboardComponent,
        title: 'Home',
      },

      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent,
            title: 'Users',
          },
          {
            path: 'add',
            component: AddUserComponent,
            title: 'New user',
          },
          {
            path: 'edit/:id',
            component: EditUserComponent,
            title: 'Edit user',
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
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
})
export class AppRoutingModule {}
