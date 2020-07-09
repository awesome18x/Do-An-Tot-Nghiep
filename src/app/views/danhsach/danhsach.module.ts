import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhsachRoutingModule } from './danhsach-routing.module';
import { DanhsachchokhamComponent } from './components/danhsachchokham/danhsachchokham.component';
import { DanhsachdangkhamComponent } from './components/danhsachdangkham/danhsachdangkham.component';
import { DanhsachdakhamComponent } from './components/danhsachdakham/danhsachdakham.component';
import { DanhsachhuykhamComponent } from './components/danhsachhuykham/danhsachhuykham.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DanhsachchokhamComponent, DanhsachdangkhamComponent, DanhsachdakhamComponent, DanhsachhuykhamComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    DanhsachRoutingModule
  ]
})
export class DanhsachModule { }
