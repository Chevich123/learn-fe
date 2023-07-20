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
    component: WrapperComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },

      {
        path: 'products',
        children: [
          {
            path: 'add',
            component: AddProductComponent,
            title: 'New product',
          },
          {
            path: '',
            component: ProductsComponent,
            pathMatch: 'full',
            title: 'Products',
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
