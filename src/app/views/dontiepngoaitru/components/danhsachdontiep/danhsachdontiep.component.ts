import { LoaiKhoaPhong } from './../../../../constants/constants';
import { Component, OnInit, DoCheck } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { FormGroup } from '@angular/forms';
import { DmkhoaphongService } from '../../../../shared/services/dmkhoaphong.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';



@Component({
  selector: 'app-danhsachdontiep',
  templateUrl: './danhsachdontiep.component.html',
  styleUrls: ['./danhsachdontiep.component.css']
})
export class DanhsachdontiepComponent implements OnInit, DoCheck {
  locale = 'vi';
  locales = listLocales();
  hello: FormGroup;
  phongKhams: PhongKham[] = [];
  selectedPK: PhongKham;
  constructor(
    private khoaPhongService: DmkhoaphongService,
    private localeService: BsLocaleService
  ) {
    // this.localeService.use(this.locale);
  }

  ngDoCheck() {
    this.localeService.use('vi');
  }

  ngOnInit(): void {
    this.khoaPhongService.getAllPhongKham(LoaiKhoaPhong.PhongKham).subscribe((data: any) => {
      console.log(data);
      this.phongKhams = data.dmKhoaPhong;
      // this.selectedPK = data.dmKhoaPhong[0];
    }, (error) => {
      console.log(error);
    });

  }

  applyLocale(pop: any) {
    this.localeService.use(this.locale);
    pop.hide();
    pop.show();
  }

  onChange() {}

}
