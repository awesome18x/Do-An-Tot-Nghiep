import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DontiepngoaitruRoutingModule } from './dontiepngoaitru-routing.module';
import { DontiepComponent } from './components/dontiep/dontiep.component';
import { DanhsachdontiepComponent } from './components/danhsachdontiep/danhsachdontiep.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DontiepComponent, DanhsachdontiepComponent],
  imports: [
    CommonModule,
    FormsModule,
    DontiepngoaitruRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    // NgbDate,
    NgbModule
  ]
})
export class DontiepngoaitruModule { }
