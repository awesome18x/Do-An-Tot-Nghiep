import { LoaiKhoaPhong } from './../../../../constants/constants';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { FormGroup } from '@angular/forms';
import { DmkhoaphongService } from '../../../../shared/services/dmkhoaphong.service';

@Component({
  selector: 'app-danhsachdontiep',
  templateUrl: './danhsachdontiep.component.html',
  styleUrls: ['./danhsachdontiep.component.css']
})
export class DanhsachdontiepComponent implements OnInit {
  hello: FormGroup;
  phongKhams: PhongKham[] = [];
  selectedPK: PhongKham;
  constructor(
    private khoaPhongService: DmkhoaphongService
  ) { }

  ngOnInit(): void {
    this.khoaPhongService.getAllPhongKham(LoaiKhoaPhong.PhongKham).subscribe((data: any) => {
      console.log(data);
      this.phongKhams = data.dmKhoaPhong;
      // this.selectedPK = data.dmKhoaPhong[0];
    }, (error) => {
      console.log(error);
    });

  }

  onChange() {}

}
