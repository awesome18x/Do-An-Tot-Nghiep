import { HsphieukhamService } from './../../../dontiepngoaitru/services/hsphieukham.service';
import { LoaiKhoaPhong } from './../../../../constants/constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { DSChoKhamService } from '../../service/dschokham.service';
import { HSPhieuKham } from '../../../../models/hsphieukham';
import { DmkhoaphongService } from '../../../../shared/services/dmkhoaphong.service';
import { SpeechService } from '../../../../shared/services/speech.service';

@Component({
  selector: 'app-danhsachchokham',
  templateUrl: './danhsachchokham.component.html',
  styleUrls: ['./danhsachchokham.component.css']
})
export class DanhsachchokhamComponent implements OnInit {
  dsDangKham: any[] = [];
  pageSize: number = 10;
  pageIndex: number = 1;
  pageIndexDangKham: number = 1;
  status_chokham: number = 1;
  time = new Date();
  timee: any;
  phongKhams: PhongKham[] = [];
  id_default: string;
  listChoKhams: any[];
  tongChoKhams: number;
  tongDangKhams: number;
  constructor(
    private dmkhoaPhongService: DmkhoaphongService,
    private dsChoKhamService: DSChoKhamService,
    private router: Router,
    private speechService: SpeechService,
    private hsPhieuKhamService: HsphieukhamService
  ) { }

  ngOnInit(): void {
    this.timee = this.time.getHours() + ':' + this.time.getMinutes();
    this.dmkhoaPhongService.getAllPhongKham(LoaiKhoaPhong.PhongKham).subscribe((data: any) => {
      this.phongKhams = data.dmKhoaPhong;
      this.id_default = data.dmKhoaPhong[0]._id;
      this.getListBNChoKham(this.status_chokham, this.id_default, this.pageSize, this.pageIndex);
      this.getListBNDangKham(this.id_default, this.pageSize, this.pageIndexDangKham);
    }, (error) => {
      console.log(error);
    });
    // this.getListBNDangKham(this.id_default, this.pageSize, this.pageIndex);
  }

  getListBNDangKham(idbuongkham: string, pageSize: number, pageIndex: number) {
    this.hsPhieuKhamService.dsBenhNhanDangKham(idbuongkham, pageSize, pageIndex).subscribe((data: any) => {
      this.dsDangKham = data.data;
      this.tongDangKhams = data.totalResult;
      // console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  getListBNChoKham(status: number, idbuongkham: string, pageSize: number, pageIndex: number) {
    // lấy ds BN chờ khám
    this.dsChoKhamService.getBNChoKham(status, idbuongkham, pageSize, pageIndex).subscribe((data: any) => {
      // console.log(data);
      this.listChoKhams = data.HSPhieuKham;
      this.tongChoKhams = data.count;
    }, (error) => {
      console.log(error);
    });
  }

  onChange(event) {
    this.id_default = event;
    this.pageIndex = 1;
    this.getListBNChoKham(this.status_chokham, this.id_default, this.pageSize, this.pageIndex);
    this.getListBNDangKham(this.id_default, this.pageSize, this.pageIndex);
  }

  getPhieuKham(id) {
    // console.log(id);
    this.router.navigate([`/danhsach/phieu-kham-ngoai-tru/${id}`]);
  }

  callBenhNhan(bn) {
    // console.log(bn);
    // return;
    const template = `Mời bệnh nhân ${bn.BenhNhan.HoTen} vào ${bn.PhongKham.name}`;
    this.speechService.speakTemplate(template, bn);
  }

  loadPage(pageCurrent: number) {
    this.pageIndex = pageCurrent;
    this.getListBNChoKham(this.status_chokham, this.id_default, this.pageSize, this.pageIndex);
  }

  loadPageDangKham(pageCurrent: number) {
    this.pageIndexDangKham = pageCurrent;
    this.getListBNChoKham(this.status_chokham, this.id_default, this.pageSize, this.pageIndexDangKham);
  }

}
