import { PhieukhamngoaitruComponent } from './components/phieukhamngoaitru/phieukhamngoaitru.component';
import { DanhsachchokhamComponent } from './components/danhsachchokham/danhsachchokham.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhsachdakhamComponent } from './components/danhsachdakham/danhsachdakham.component';
import { DanhsachhuykhamComponent } from './components/danhsachhuykham/danhsachhuykham.component';
import { DanhsachdangkhamComponent } from './components/danhsachdangkham/danhsachdangkham.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'danh-sach-cho-kham',
    pathMatch: 'full'
  },
  {
    path: 'danh-sach-cho-kham',
    component: DanhsachchokhamComponent,
    children: [
      {
        path: '',
        component: DanhsachdangkhamComponent
      }
    ]
  },
  {
    path: 'danh-sach-da-kham',
    component: DanhsachdakhamComponent
  },
  {
    path: 'danh-sach-huy-kham',
    component: DanhsachhuykhamComponent
  },
  {
    path: 'phieu-kham-ngoai-tru/:id',
    component: PhieukhamngoaitruComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhsachRoutingModule { }
