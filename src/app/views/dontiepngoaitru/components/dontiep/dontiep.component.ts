import { HSPhieuKham } from './../../../../models/hsphieukham';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { KhoaphongService } from '../../services/khoaphong.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaikhamService } from '../../services/loaikham.service';
import { LoaiKham } from '../../../../models/loaikham';
import { zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { HsphieukhamService } from '../../services/hsphieukham.service';

@Component({
  selector: 'app-dontiep',
  templateUrl: './dontiep.component.html',
  styleUrls: ['./dontiep.component.css']
})
export class DontiepComponent implements OnInit {
  dangKyKhamBenhForm: FormGroup;
  phongKhams: PhongKham[] = [];
  loaiKhams: LoaiKham[] = [];
  loaiKhamSelected: LoaiKham;
  phongKhamSelected: PhongKham;
  handau = moment().startOf('year').format('DD/MM/YYYY');
  hancuoi = moment().endOf('year').format('DD/MM/YYYY');

  constructor(
    private fb: FormBuilder,
    private khoaPhongService: KhoaphongService,
    private loaikhamService: LoaikhamService,
    private hsPhieuKhamService: HsphieukhamService
  ) { }

  ngOnInit() {
    zip(this.loaikhamService.getAllLoaiKham(), this.khoaPhongService.getAllPhongKham())
    .pipe(
      tap(([loaiKham, phongKham]: any[]) => {
        this.loaiKhams = loaiKham.loaikham;
        this.loaiKhamSelected = loaiKham.loaikham[0]._id;
        this.phongKhams = phongKham.dmKhoaPhong;
        this.phongKhamSelected = phongKham.dmKhoaPhong[0]._id;
      })
    )
    .subscribe(() => {
      this.initForm();
      // this.loaiKhams = loaiKham.loaikham;
      // this.loaiKhamSelected = loaiKham.loaikham[0]._id;
      // this.phongKhams = phongKham.dmKhoaPhong;
    }, error => console.log(error));
    // this.loaikhamService.getAllLoaiKham()
    // .subscribe((data: any) => {
    //   console.log(data);
    //   this.loaiKhams = data.loaikham;
    //   this.loaiKhamSelected = data.loaikham[0]._id;
    //   console.log(this.loaiKhamSelected);
    // });
    // this.khoaPhongService.getAllPhongKham()
    // .subscribe((data: any) => {
    //   console.log(data);
    //   this.phongKhams = data.dmKhoaPhong;
    // }, (error) => {
    //   console.log(error);
    // });
    // this.initForm();
    // this.dangKyKhamBenhForm.patchValue({
    //   idloaikham: this.
    // })
    // this.el.nativeElement.hehe.
  }

  initForm() {
    this.dangKyKhamBenhForm = this.fb.group({
      mahoso: ['', Validators.required],
      noidkthebhyt: ['', Validators.required],
      diachithebhyt: ['', Validators.required],
      makhuvuc: [null],
      hoten: ['', Validators.required],
      cmnd: [''],
      quoctich: ['Việt Nam'],
      tinhthanh: [''],
      diachinha: [''],
      noidungkham: [''],
      idloaikham: [this.loaiKhamSelected],
      idbenhvientruoc: [''],
      sohosobhyt: [''],
      ngaybatdau: [this.handau],
      ngayketthuc: [this.hancuoi],
      ngaysinh: [''],
      gioitinh: [''],
      dantoc: ['Kinh'],
      quanhuyen: [''],
      dienthoai: [''],
      masothue: [''],
      idbuongkham: [this.phongKhamSelected],
      chandoantuyenduoi: ['']
    });
    console.log('h2h2h2');
  }

  onChange() {}

  onSubmit() {
    const body = new HSPhieuKham();
    body.hoten = this.dangKyKhamBenhForm.value.hoten;
    body.idbuongkham = this.dangKyKhamBenhForm.value.idbuongkham;
    body.idloaikham = this.dangKyKhamBenhForm.value.idloaikham;
    body.ngaydontiep = new Date();
    console.log(body);
    // console.log(this.dangKyKhamBenhForm.value);
    // this.hsPhieuKhamService.createHSPhieuKham
  }

  resetForm() {
    this.dangKyKhamBenhForm.reset();
  }

}
