import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DontiepngoaitruRoutingModule } from './dontiepngoaitru-routing.module';
import { DontiepComponent } from './components/dontiep/dontiep.component';
import { DanhsachdontiepComponent } from './components/danhsachdontiep/danhsachdontiep.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [DontiepComponent, DanhsachdontiepComponent],
  imports: [
    CommonModule,
    DontiepngoaitruRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    SharedModule
  ]
})
export class DontiepngoaitruModule { }
