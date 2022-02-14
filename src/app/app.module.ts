import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { LoginComponent } from './login/login.component';
import { RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { UsersComponent } from './users/users.component';
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditingComponent, DialogContent } from './editing/editing.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    DashboardComponent,
    EditingComponent,
    DialogContent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
