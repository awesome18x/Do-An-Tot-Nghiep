import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DontiepngoaitruRoutingModule } from './dontiepngoaitru-routing.module';
import { DontiepComponent } from './components/dontiep/dontiep.component';


@NgModule({
  declarations: [DontiepComponent],
  imports: [
    CommonModule,
    DontiepngoaitruRoutingModule
  ]
})
export class DontiepngoaitruModule { }
