import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditingComponent } from './editing/editing.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogComponent } from './users/dialog/dialog.component';
import { EditDialogComponent } from './editing/edit-dialog/edit-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    CreateUserComponent,
    DashboardComponent,
    EditingComponent,
    DialogComponent,
    EditDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterTestingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
