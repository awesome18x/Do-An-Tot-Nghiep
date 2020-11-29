import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DieutrinoitruRoutingModule } from './dieutrinoitru-routing.module';
import { CapsovaovienComponent } from './capsovaovien/capsovaovien.component';
import { DsbenhanNoitruComponent } from './dsbenhan-noitru/dsbenhan-noitru.component';


@NgModule({
  declarations: [CapsovaovienComponent, DsbenhanNoitruComponent],
  imports: [
    CommonModule,
    DieutrinoitruRoutingModule
  ]
})
export class DieutrinoitruModule { }
