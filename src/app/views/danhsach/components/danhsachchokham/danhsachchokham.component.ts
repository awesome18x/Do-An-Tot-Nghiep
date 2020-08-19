import { LoaiKhoaPhong } from './../../../../constants/constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { DSChoKhamService } from '../../service/dschokham.service';
import { HSPhieuKham } from '../../../../models/hsphieukham';
import { DmkhoaphongService } from '../../../../shared/services/dmkhoaphong.service';

@Component({
  selector: 'app-danhsachchokham',
  templateUrl: './danhsachchokham.component.html',
  styleUrls: ['./danhsachchokham.component.css']
})
export class DanhsachchokhamComponent implements OnInit {
  status_chokham: number = 1;
  time = new Date();
  timee: any;
  phongKhams: PhongKham[] = [];
  id_default: string;
  listChoKhams: any[];
  tongChoKhams: number;
  constructor(
    private dmkhoaPhongService: DmkhoaphongService,
    private dsChoKhamService: DSChoKhamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.timee = this.time.getHours() + ':' + this.time.getMinutes();
    this.dmkhoaPhongService.getAllPhongKham(LoaiKhoaPhong.PhongKham).subscribe((data: any) => {
      this.phongKhams = data.dmKhoaPhong;
      this.id_default = data.dmKhoaPhong[0]._id;
      this.getListBNChoKham(this.status_chokham, this.id_default);
    }, (error) => {
      console.log(error);
    });

  }

  getListBNChoKham(status: number, idbuongkham: string) {
    // lấy ds BN chờ khám
    this.dsChoKhamService.getBNChoKham(status, idbuongkham).subscribe((data: any) => {
      // console.log(data);
      this.listChoKhams = data.HSPhieuKham;
      this.tongChoKhams = this.listChoKhams.length;
    }, (error) => {
      console.log(error);
    });
  }

  onChange(event) {
    this.id_default = event;
    this.getListBNChoKham(this.status_chokham, this.id_default);
  }

  getPhieuKham(id) {
    // console.log(id);
    this.router.navigate([`/danhsach/phieu-kham-ngoai-tru/${id}`]);
  }

}
