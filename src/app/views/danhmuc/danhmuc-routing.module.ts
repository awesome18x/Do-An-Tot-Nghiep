import { CreateIcdComponent } from './components/danhmucicd/create-icd/create-icd.component';
import { DanhmucloaikhamComponent } from './components/danhmucloaikham/danhmucloaikham.component';
import { DanhmucthuocComponent } from './components/danhmucthuoc/danhmucthuoc.component';
import { NewdvktComponent } from './components/danhmucdvkt/newdvkt/newdvkt.component';
import { ListdvktComponent } from './components/danhmucdvkt/listdvkt/listdvkt.component';
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
import { DanhmuckhoduocComponent } from './components/danhmuckhoduoc/danhmuckhoduoc.component';
import { ListIcdComponent } from './components/danhmucicd/list-icd/list-icd.component';
import { ListLoaikhamComponent } from './components/danhmucloaikham/list-loaikham/list-loaikham.component';
import { CreateLoaikhamComponent } from './components/danhmucloaikham/create-loaikham/create-loaikham.component';


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
    path: 'loai-kham',
    component: DanhmucloaikhamComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListLoaikhamComponent
      },
      {
        path: 'create-or-update',
        component: CreateLoaikhamComponent
      },
      {
        path: 'create-or-update/:id',
        component: CreateLoaikhamComponent
      }]
  },
  {
    path: 'icd',
    component: DanhmucicdComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListIcdComponent
      },
      {
        path: 'create-or-update',
        component: CreateIcdComponent
      },
      {
        path: 'create-or-update/:id',
        component: CreateIcdComponent
      }]
  },
  {
    path: 'thuoc',
    component: DanhmucthuocComponent
  },
  {
    path: 'kho-duoc',
    component: DanhmuckhoduocComponent
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
    component: DanhmucdvktComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListdvktComponent
      },
      {
        path: 'create-or-update',
        component: NewdvktComponent
      },
      {
        path: 'create-or-update/:id',
        component: NewdvktComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhmucRoutingModule { }
