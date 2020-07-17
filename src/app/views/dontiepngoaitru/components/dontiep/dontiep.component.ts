import { TheBHYTService } from './../../services/thebhyt.service';
import { DMBenhNhan } from './../../../../models/dmbenhnhan';
import { DMTheBHYT } from './../../../../models/dmthebhyt';
import { HSPhieuKham } from './../../../../models/hsphieukham';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { KhoaphongService } from '../../services/khoaphong.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaikhamService } from '../../services/loaikham.service';
import { LoaiKham } from '../../../../models/loaikham';
import { zip, asapScheduler, of, forkJoin } from 'rxjs';
import { tap, flatMap, mergeMap, retry } from 'rxjs/operators';
import * as moment from 'moment';
import { HsphieukhamService } from '../../services/hsphieukham.service';
import { AppAsideComponent } from '@coreui/angular';
import { DMBenhNhanService } from '../../services/dmbenhnhan.service';

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
    private hsPhieuKhamService: HsphieukhamService,
    private theBHYTService: TheBHYTService,
    private dmBenhNhanService: DMBenhNhanService
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
    }, (error) => {
      console.log(error);
    });
  }

  initForm() {
    this.dangKyKhamBenhForm = this.fb.group({
      sothebhyt: ['HS4010123298834985'],
      noidkthebhyt: ['', Validators.required],
      diachitheothe: ['', Validators.required],
      makhuvuc: [null],
      hoten: ['', Validators.required],
      socmnd: [''],
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
    phieukham.sothebhyt = this.dangKyKhamBenhForm.value.sothebhyt;
    phieukham.ngaydontiep = new Date();
    phieukham.benhvientruoc = this.dangKyKhamBenhForm.value.benhvientruoc;
    phieukham.chandoantuyenduoi = this.dangKyKhamBenhForm.value.chandoantuyenduoi;
    phieukham.trangthai = 1;
    // console.log(phieukham);

    // create DMBenhNhan
    benhnhan.hoten = this.dangKyKhamBenhForm.value.hoten;
    benhnhan.ngaysinh = this.dangKyKhamBenhForm.value.ngaysinh;
    benhnhan.gioitinh = +this.dangKyKhamBenhForm.value.gioitinh;
    benhnhan.socmnd = this.dangKyKhamBenhForm.value.socmnd;
    benhnhan.quoctich = this.dangKyKhamBenhForm.value.quoctich;
    benhnhan.dantoc = this.dangKyKhamBenhForm.value.dantoc;
    benhnhan.sdt = this.dangKyKhamBenhForm.value.dienthoai;
    benhnhan.masothue = this.dangKyKhamBenhForm.value.masothue;
    benhnhan.diachi = this.dangKyKhamBenhForm.value.diachinha;
    // console.log(benhnhan);

    // create DMTheBHYT
    thebhyt.sothebhyt = this.dangKyKhamBenhForm.value.sothebhyt;
    thebhyt.noidangkythe = this.dangKyKhamBenhForm.value.noidkthebhyt;
    thebhyt.diachitheothe = this.dangKyKhamBenhForm.value.diachitheothe;
    thebhyt.handau = this.dangKyKhamBenhForm.value.ngaybatdau;
    thebhyt.hancuoi = this.dangKyKhamBenhForm.value.ngayketthuc;
    thebhyt.makhuvuc = this.dangKyKhamBenhForm.value.makhuvuc;
    // console.log(thebhyt);

    // this.dmBenhNhanService.createDMBenhNhan(benhnhan).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });
    // this.theBHYTService.createTheBHYT(thebhyt).subscribe(data => {
    //   console.log(data);
    // }, (error) => {
    //   console.log(error);
    // });
    // this.hsPhieuKhamService.createHSPhieuKham(phieukham).subscribe(data => {
    //   console.log(data);
    // }, (error) => {
    //   console.log(error);
    // });

    const createTheBHYT = this.theBHYTService.createTheBHYT(thebhyt);
    const createDMBenhNhan = this.dmBenhNhanService.createDMBenhNhan(benhnhan);

    // forkJoin([createTheBHYT, createDMBenhNhan]).pipe(
    //   mergeMap(([thebhyt1, benhnhan1]: any[]) => {
    //     phieukham.idthebhyt = thebhyt1._id;
    //     phieukham.idbenhnhan = benhnhan1._id;
    //     return this.hsPhieuKhamService.createHSPhieuKham(phieukham);
    //   })
    // ).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });
    forkJoin([createTheBHYT, createDMBenhNhan]).pipe(
      mergeMap((data: [DMTheBHYT, DMBenhNhan]) => {
        phieukham.idthebhyt = data[0]._id;
        // console.log(data[0].TheBHYT._id);
        phieukham.idbenhnhan = data[1]._id;
        // console.log(data[1]);
        return this.hsPhieuKhamService.createHSPhieuKham(phieukham);
      })
    ).subscribe(data => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  resetForm() {
    this.dangKyKhamBenhForm.reset(this.dangKyKhamBenhForm.value);
  }

}
