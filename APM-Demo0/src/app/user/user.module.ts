import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';


const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('user', reducer)
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
