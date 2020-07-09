import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    DanhmuckhoaphongComponent,
    DanhmucbenhvienComponent,
    DanhmucicdComponent,
    DanhmucdvktComponent,
    DanhmucdantocComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    DanhmucRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModalModule
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
