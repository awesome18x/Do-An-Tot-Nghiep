import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DontiepngoaitruRoutingModule } from './dontiepngoaitru-routing.module';
import { DontiepComponent } from './components/dontiep/dontiep.component';
import { DanhsachdontiepComponent } from './components/danhsachdontiep/danhsachdontiep.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DontiepComponent, DanhsachdontiepComponent],
  imports: [
    CommonModule,
    DontiepngoaitruRoutingModule,
    FormsModule
  ]
})
export class DontiepngoaitruModule { }
