import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DontiepngoaitruRoutingModule } from './dontiepngoaitru-routing.module';
import { DontiepComponent } from './components/dontiep/dontiep.component';
import { DanhsachdontiepComponent } from './components/danhsachdontiep/danhsachdontiep.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [DontiepComponent, DanhsachdontiepComponent],
  imports: [
    CommonModule,
    FormsModule,
    DontiepngoaitruRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    BsDatepickerModule.forRoot()
  ]
})
export class DontiepngoaitruModule { }
