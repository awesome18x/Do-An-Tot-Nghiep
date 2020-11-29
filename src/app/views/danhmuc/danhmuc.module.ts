import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhmucRoutingModule } from './danhmuc-routing.module';
import { DanhmuckhoaphongComponent } from './components/danhmuckhoaphong/danhmuckhoaphong.component';
import { DanhmucbenhvienComponent } from './components/danhmucbenhvien/danhmucbenhvien.component';
import { DanhmucicdComponent } from './components/danhmucicd/danhmucicd.component';
import { DanhmucdvktComponent } from './components/danhmucdvkt/danhmucdvkt.component';
import { DanhmucdantocComponent } from './components/danhmucdantoc/danhmucdantoc.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './components/danhmuckhoaphong/create/create.component';
import { ListComponent } from './components/danhmuckhoaphong/list/list.component';
import { DsdtComponent } from './components/danhmucdantoc/dsdt/dsdt.component';
import { NewdtComponent } from './components/danhmucdantoc/newdt/newdt.component';
import { NewdvktComponent } from './components/danhmucdvkt/newdvkt/newdvkt.component';
import { ListdvktComponent } from './components/danhmucdvkt/listdvkt/listdvkt.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { DanhmucthuocComponent } from './components/danhmucthuoc/danhmucthuoc.component';


@NgModule({
  declarations: [
    DanhmuckhoaphongComponent,
    DanhmucbenhvienComponent,
    DanhmucicdComponent,
    DanhmucdvktComponent,
    DanhmucdantocComponent,
    CreateComponent,
    ListComponent,
    DsdtComponent,
    NewdtComponent,
    NewdvktComponent,
    ListdvktComponent,
    DanhmucthuocComponent,
  ],
  imports: [
    CommonModule,
    DanhmucRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbPaginationModule,
    NgSelectModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class DanhmucModule { }
