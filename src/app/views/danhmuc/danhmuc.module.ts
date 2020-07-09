import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhmucRoutingModule } from './danhmuc-routing.module';
import { DanhmuckhoaphongComponent } from './components/danhmuckhoaphong/danhmuckhoaphong.component';
import { DanhmucbenhvienComponent } from './components/danhmucbenhvien/danhmucbenhvien.component';
import { DanhmucicdComponent } from './components/danhmucicd/danhmucicd.component';
import { DanhmucdvktComponent } from './components/danhmucdvkt/danhmucdvkt.component';
import { DanhmucdantocComponent } from './components/danhmucdantoc/danhmucdantoc.component';


@NgModule({
  declarations: [DanhmuckhoaphongComponent, DanhmucbenhvienComponent, DanhmucicdComponent, DanhmucdvktComponent, DanhmucdantocComponent],
  imports: [
    CommonModule,
    DanhmucRoutingModule,
    HttpClientModule
  ]
})
export class DanhmucModule { }
