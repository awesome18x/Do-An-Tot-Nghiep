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
import { tap, flatMap, mergeMap, retry, map } from 'rxjs/operators';
import * as moment from 'moment';
import { HsphieukhamService } from '../../services/hsphieukham.service';
import { AppAsideComponent } from '@coreui/angular';
import { DMBenhNhanService } from '../../services/dmbenhnhan.service';
import { ToastrService } from 'ngx-toastr';

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
    private dmBenhNhanService: DMBenhNhanService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
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
      noidkthebhyt: [null, Validators.required],
      diachitheothe: [null, Validators.required],
      makhuvuc: [null],
      hoten: [null, Validators.required],
      socmnd: [null],
      quoctich: ['Việt Nam'],
      tinhthanh: [null],
      diachinha: [null],
      noidungkham: [null],
      idloaikham: [this.loaiKhamSelected],
      benhvientruoc: [null],
      sohosobhyt: [null],
      ngaybatdau: [this.handau],
      ngayketthuc: [this.hancuoi],
      ngaysinh: [null],
      gioitinh: [null],
      dantoc: ['Kinh'],
      quanhuyen: [null],
      dienthoai: [null],
      masothue: [null],
      idbuongkham: [this.phongKhamSelected],
      chandoantuyenduoi: [null]
    });
  }

  onChange() {}

  onSubmit() {
    // từ đón tiếp => tạo ra 3 bảng 1 lúc
    const thebhyt = new DMTheBHYT();
    const benhnhan = new DMBenhNhan();
    const phieukham = new HSPhieuKham();

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

    // create HSPhieuKham
    phieukham.hoten = this.dangKyKhamBenhForm.value.hoten;
    phieukham.idbuongkham = this.dangKyKhamBenhForm.value.idbuongkham;
    phieukham.idloaikham = this.dangKyKhamBenhForm.value.idloaikham;
    phieukham.sothebhyt = this.dangKyKhamBenhForm.value.sothebhyt;
    phieukham.ngaydontiep = new Date();
    phieukham.benhvientruoc = this.dangKyKhamBenhForm.value.benhvientruoc;
    phieukham.chandoantuyenduoi = this.dangKyKhamBenhForm.value.chandoantuyenduoi;
    phieukham.isbhyt = true;
    phieukham.trangthai = 1;
    // console.log(phieukham);


    const createTheBHYT = this.theBHYTService.createTheBHYT(thebhyt);
    const createDMBenhNhan = this.dmBenhNhanService.createDMBenhNhan(benhnhan);

    // giả sử ko có BHYT:
    //   - Chỉ có 2 bảng được insert dữ liệu là HSPhieuKham và DMBenhNhan
    //   - Cách giải quyết ntn:
    //     + Lấy được id bệnh nhân trước rồi mới insert dữ liệ vào HSPhieuKham
    if (!phieukham.isbhyt) {
      this.dmBenhNhanService.createDMBenhNhan(benhnhan).pipe(
        map(result => {
          phieukham.idbenhnhan = result._id;
          return phieukham;
        }),
        // tslint:disable-next-line: no-shadowed-variable
        mergeMap(phieukham => this.hsPhieuKhamService.createHSPhieuKham(phieukham))
      ).subscribe(data => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    } else {
      // Nếu BN có thẻ BHYT thì insert dữ liệu vào 2 bảng DMBenhNhan và DMTheBHYT
      // sau đó lấy id gắn vào HSPhieuKham

        forkJoin([createTheBHYT, createDMBenhNhan]).pipe(
          mergeMap((data: [DMTheBHYT, DMBenhNhan]) => {
            phieukham.idthebhyt = data[0]._id;
            phieukham.idbenhnhan = data[1]._id;
            return this.hsPhieuKhamService.createHSPhieuKham(phieukham);
          })
        ).subscribe(data => {
          this.toastrService.success('Đón tiếp bệnh nhân mới thành công', 'Thành công');
          console.log(data);
        }, (error) => {
          console.log(error);
        });
    }
  }

  resetForm() {
    this.dangKyKhamBenhForm.reset(this.dangKyKhamBenhForm.value);
  }

}
