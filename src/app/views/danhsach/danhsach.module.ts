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
import { SharedModule } from '../../shared/shared.module';
import { DisableControlDirective } from './components/phieukhamngoaitru/disabled.directive';
import { PhieuchuyentuyenComponent } from './components/phieuchuyentuyen/phieuchuyentuyen.component';


@NgModule({
  declarations: [
    DanhsachchokhamComponent,
    DanhsachdangkhamComponent,
    DanhsachdakhamComponent,
    DanhsachhuykhamComponent,
    PhieukhamngoaitruComponent,
    DisableControlDirective,
    PhieuchuyentuyenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DanhsachRoutingModule,
    NgbModule,
    TextMaskModule,
    SharedModule
  ],
  exports: [
    PhieukhamngoaitruComponent
  ]
})
export class DanhsachModule { }
