import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionRoutingModule } from './option-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './components/create-user/new/new.component';
import { ListComponent } from './components/create-user/list/list.component';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    CreateUserComponent,
    NewComponent,
    ListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    OptionRoutingModule,
    HttpClientModule
  ]
})
export class OptionModule { }
