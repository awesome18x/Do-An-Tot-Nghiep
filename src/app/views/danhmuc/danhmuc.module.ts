import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';
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
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './components/danhmuckhoaphong/create/create.component';
import { ListComponent } from './components/danhmuckhoaphong/list/list.component';


@NgModule({
  declarations: [
    DanhmuckhoaphongComponent,
    DanhmucbenhvienComponent,
    DanhmucicdComponent,
    DanhmucdvktComponent,
    DanhmucdantocComponent,
    ConfirmDialogComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DanhmucRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbPaginationModule
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [
    ConfirmDialogService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class DanhmucModule { }
