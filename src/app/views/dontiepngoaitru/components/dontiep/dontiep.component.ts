import { DMBenhNhan } from './../../../../models/dmbenhnhan';
import { DMTheBHYT } from './../../../../models/dmthebhyt';
import { HSPhieuKham } from './../../../../models/hsphieukham';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { KhoaphongService } from '../../services/khoaphong.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaikhamService } from '../../services/loaikham.service';
import { LoaiKham } from '../../../../models/loaikham';
import { zip, asapScheduler } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';
import * as moment from 'moment';
import { HsphieukhamService } from '../../services/hsphieukham.service';
import { AppAsideComponent } from '@coreui/angular';

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
      benhvientruoc: [''],
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
    // từ đón tiếp => tạo ra 3 bảng 1 lúc
    const thebhyt = new DMTheBHYT();
    const benhnhan = new DMBenhNhan();
    const phieukham = new HSPhieuKham();
    // create HSPhieuKham
    phieukham.hoten = this.dangKyKhamBenhForm.value.hoten;
    phieukham.idbuongkham = this.dangKyKhamBenhForm.value.idbuongkham;
    phieukham.idloaikham = this.dangKyKhamBenhForm.value.idloaikham;
    phieukham.mahoso = this.dangKyKhamBenhForm.value.mahoso;
    phieukham.ngaydontiep = new Date();
    phieukham.benhvientruoc = this.dangKyKhamBenhForm.value.benhvientruoc;
    phieukham.chandoantuyenduoi = this.dangKyKhamBenhForm.value.chandoantuyenduoi;
    phieukham.trangthai = 1;
    console.log(phieukham);

    // asdasd.create()
    // .pipe(
    //   platMap((data) => {
    //     return vcvxv.create(data);
    //   }),
    //   platMap((data1) => {
    //     return asapScheduler.cr();
    //   }).148
    // ).


    // create DMBenhNhan
    benhnhan.hoten = this.dangKyKhamBenhForm.value.hoten;
    benhnhan.ngaysinh = this.dangKyKhamBenhForm.value.ngaysinh;
    benhnhan.gioitinh = +this.dangKyKhamBenhForm.value.gioitinh;
    benhnhan.CMND = this.dangKyKhamBenhForm.value.cmnd;
    benhnhan.quoctich = this.dangKyKhamBenhForm.value.cmnd;
    benhnhan.dantoc = this.dangKyKhamBenhForm.value.dantoc;
    benhnhan.sdt = this.dangKyKhamBenhForm.value.dienthoai;
    benhnhan.MST = this.dangKyKhamBenhForm.value.masothue;
    // console.log(typeof(+this.dangKyKhamBenhForm.value.gioitinh));
    // this.hsPhieuKhamService.createHSPhieuKham

    // create DMTheBHYT
    thebhyt.mathe = this.dangKyKhamBenhForm.value.mahoso;
    thebhyt.noidangkythe = this.dangKyKhamBenhForm.value.noidkthebhyt;
    thebhyt.handau = this.dangKyKhamBenhForm.value.ngaybatdau;
    thebhyt.hancuoi = this.dangKyKhamBenhForm.value.ngayketthuc;
    thebhyt.makhuvuc = this.dangKyKhamBenhForm.value.makhuvuc;


    this.hsPhieuKhamService.createHSPhieuKham(phieukham)
      .pipe(
        flatMap((data: any) => {
          return data;
        })
      )
  }

  resetForm() {
    this.dangKyKhamBenhForm.reset(this.dangKyKhamBenhForm.value);
  }

}
