import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AuthForm } from './components/auth-form/auth-form';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared-module';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register }
];

@NgModule({
  declarations: [
    Login,
    Register,
    AuthForm
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule
  ]
})
export class AuthModule { }
