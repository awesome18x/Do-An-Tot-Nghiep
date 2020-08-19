import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhsachRoutingModule } from './danhsach-routing.module';
import { DanhsachchokhamComponent } from './components/danhsachchokham/danhsachchokham.component';
import { DanhsachdangkhamComponent } from './components/danhsachdangkham/danhsachdangkham.component';
import { DanhsachdakhamComponent } from './components/danhsachdakham/danhsachdakham.component';
import { DanhsachhuykhamComponent } from './components/danhsachhuykham/danhsachhuykham.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhieukhamngoaitruComponent } from './components/phieukhamngoaitru/phieukhamngoaitru.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
  declarations: [
    DanhsachchokhamComponent,
    DanhsachdangkhamComponent,
    DanhsachdakhamComponent,
    DanhsachhuykhamComponent,
    PhieukhamngoaitruComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DanhsachRoutingModule,
    NgbModule,
    TextMaskModule
  ],
  exports: [
    PhieukhamngoaitruComponent
  ]
})
export class DanhsachModule { }
