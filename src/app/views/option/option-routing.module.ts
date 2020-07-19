import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { NewComponent } from './components/create-user/new/new.component';
import { ListComponent } from './components/create-user/list/list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'change-password',
    pathMatch: 'full'
  },
  {
    path: 'change-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Change password'
    }
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    children: [
      {
        path: '', component: ListComponent
      },
      {
        path: 'new',
        component: NewComponent
      },
      {
          path: 'new/:id',
          component: NewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRoutingModule { }
