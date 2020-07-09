import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { KhoaphongService } from '../../services/khoaphong.service';

@Component({
  selector: 'app-danhsachdontiep',
  templateUrl: './danhsachdontiep.component.html',
  styleUrls: ['./danhsachdontiep.component.css']
})
export class DanhsachdontiepComponent implements OnInit {

  phongKhams: PhongKham[] = [];
  selectedPK: PhongKham;
  constructor(
    private khoaPhongService: KhoaphongService
  ) { }

  ngOnInit(): void {
    this.khoaPhongService.getAllPhongKham().subscribe((data: any) => {
      console.log(data);
      this.phongKhams = data.dmKhoaPhong;
      // this.selectedPK = data.dmKhoaPhong[0];
    }, (error) => {
      console.log(error);
    });

  }

  onChange() {}

}
