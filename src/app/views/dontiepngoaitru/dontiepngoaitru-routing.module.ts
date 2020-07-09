import { DanhsachdontiepComponent } from './components/danhsachdontiep/danhsachdontiep.component';
import { DontiepComponent } from './components/dontiep/dontiep.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'don-tiep-benh-nhan',
    pathMatch: 'full'
  },
  {
    path: 'don-tiep-benh-nhan',
    component: DontiepComponent
  },
  {
    path: 'danh-sach-don-tiep',
    component: DanhsachdontiepComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DontiepngoaitruRoutingModule { }
