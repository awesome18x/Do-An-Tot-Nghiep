import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DontiepngoaitruRoutingModule } from './dontiepngoaitru-routing.module';
import { DontiepComponent } from './components/dontiep/dontiep.component';
import { DanhsachdontiepComponent } from './components/danhsachdontiep/danhsachdontiep.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DontiepComponent, DanhsachdontiepComponent],
  imports: [
    CommonModule,
    DontiepngoaitruRoutingModule,
    ReactiveFormsModule
  ]
})
export class DontiepngoaitruModule { }
