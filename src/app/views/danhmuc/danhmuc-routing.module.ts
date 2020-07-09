import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhmucdantocComponent } from './components/danhmucdantoc/danhmucdantoc.component';
import { DanhmucbenhvienComponent } from './components/danhmucbenhvien/danhmucbenhvien.component';
import { DanhmucicdComponent } from './components/danhmucicd/danhmucicd.component';
import { DanhmuckhoaphongComponent } from './components/danhmuckhoaphong/danhmuckhoaphong.component';
import { DanhmucdvktComponent } from './components/danhmucdvkt/danhmucdvkt.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'khoa-phong',
    pathMatch: 'full'
  },
  {
    path: 'dan-toc',
    component: DanhmucdantocComponent
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
    component: DanhmuckhoaphongComponent
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
