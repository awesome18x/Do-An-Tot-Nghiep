import { CreateComponent } from './components/danhmuckhoaphong/create/create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhmucdantocComponent } from './components/danhmucdantoc/danhmucdantoc.component';
import { DanhmucbenhvienComponent } from './components/danhmucbenhvien/danhmucbenhvien.component';
import { DanhmucicdComponent } from './components/danhmucicd/danhmucicd.component';
import { DanhmuckhoaphongComponent } from './components/danhmuckhoaphong/danhmuckhoaphong.component';
import { DanhmucdvktComponent } from './components/danhmucdvkt/danhmucdvkt.component';
import { ListComponent } from './components/danhmuckhoaphong/list/list.component';
import { DsdtComponent } from './components/danhmucdantoc/dsdt/dsdt.component';
import { NewdtComponent } from './components/danhmucdantoc/newdt/newdt.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'khoa-phong',
    pathMatch: 'full'
  },
  {
    path: 'dan-toc',
    component: DanhmucdantocComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DsdtComponent
      },
      {
        path: 'create-or-update',
        component: NewdtComponent
      },
      {
        path: 'create-or-update/:id',
        component: NewdtComponent
      }
    ]
  },
  {
    path: 'benh-vien',
    component: DanhmucbenhvienComponent
  },
  {
    path: 'icd',
    component: DanhmucicdComponent
  },
  {
    path: 'khoa-phong',
    component: DanhmuckhoaphongComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'create-or-update',
        component: CreateComponent
      },
      {
        path: 'create-or-update/:id',
        component: CreateComponent
      }
    ]
  },
  {
    path: 'dvkt',
    component: DanhmucdvktComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhmucRoutingModule { }
