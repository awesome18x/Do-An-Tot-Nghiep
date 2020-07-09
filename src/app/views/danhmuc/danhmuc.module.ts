import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhmucRoutingModule } from './danhmuc-routing.module';
import { DanhmuckhoaphongComponent } from './components/danhmuckhoaphong/danhmuckhoaphong.component';
import { DanhmucbenhvienComponent } from './components/danhmucbenhvien/danhmucbenhvien.component';
import { DanhmucicdComponent } from './components/danhmucicd/danhmucicd.component';
import { DanhmucdvktComponent } from './components/danhmucdvkt/danhmucdvkt.component';


@NgModule({
  declarations: [DanhmuckhoaphongComponent, DanhmucbenhvienComponent, DanhmucicdComponent, DanhmucdvktComponent],
  imports: [
    CommonModule,
    DanhmucRoutingModule
  ]
})
export class DanhmucModule { }
