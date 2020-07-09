import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { KhoaphongService } from '../../service/khoaphong.service';
import { PhongKham } from '../../../../models/phongkham';

@Component({
  selector: 'app-danhsachchokham',
  templateUrl: './danhsachchokham.component.html',
  styleUrls: ['./danhsachchokham.component.css']
})
export class DanhsachchokhamComponent implements OnInit {
  time = new Date();
  timee: any;
  phongKhams: PhongKham[] = [];
  selectedPK: PhongKham;
  constructor(
    private khoaPhongService: KhoaphongService
  ) { }

  ngOnInit(): void {
    this.timee = this.time.getHours() + ':' + this.time.getMinutes();
    this.khoaPhongService.getAllPhongKham().subscribe((data: any) => {
      console.log(data);
      this.phongKhams = data.dmKhoaPhong;
      this.selectedPK = data.dmKhoaPhong[0];
    }, (error) => {
      console.log(error);
    });

  }

  onChange() {}

}
