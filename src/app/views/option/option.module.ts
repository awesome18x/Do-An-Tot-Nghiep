import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionRoutingModule } from './option-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    CreateUserComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    OptionRoutingModule
  ]
})
export class OptionModule { }
