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
import { TinhthanhService } from '../../services/tinhthanh.service';

@Component({
  selector: 'app-dontiep',
  templateUrl: './dontiep.component.html',
  styleUrls: ['./dontiep.component.css']
})
export class DontiepComponent implements OnInit {
  dangKyKhamBenhForm: FormGroup;
  phongKhams: PhongKham[] = [];
  loaiKhams: LoaiKham[] = [];
  tinhthanh = [];
  quanhuyen = [];
  phuongxa = [];
  loaiKhamSelected: LoaiKham;
  phongKhamSelected: PhongKham;
  tinhthanhSelected: any;
  handau = moment().startOf('year').format('DD/MM/YYYY');
  hancuoi = moment().endOf('year').format('DD/MM/YYYY');

  constructor(
    private fb: FormBuilder,
    private khoaPhongService: KhoaphongService,
    private loaikhamService: LoaikhamService,
    private hsPhieuKhamService: HsphieukhamService,
    private theBHYTService: TheBHYTService,
    private dmBenhNhanService: DMBenhNhanService,
    private toastrService: ToastrService,
    private tinhthanhService: TinhthanhService
  ) { }

  ngOnInit() {
    this.initForm();
    zip(this.loaikhamService.getAllLoaiKham(), this.khoaPhongService.getAllPhongKham(), this.tinhthanhService.getAllTinhThanh())
    .pipe(
      tap(([loaiKham, phongKham, tinhThanh]: any[]) => {
        this.loaiKhams = loaiKham.loaikham;
        this.loaiKhamSelected = loaiKham.loaikham[0]._id;
        this.phongKhams = phongKham.dmKhoaPhong;
        this.phongKhamSelected = phongKham.dmKhoaPhong[0]._id;
        this.tinhthanh = tinhThanh.tinhthanh;
        this.tinhthanhSelected = this.tinhthanh[0].code;
      })
    )
    .subscribe(() => {
      // this.initForm();
      this.dangKyKhamBenhForm.patchValue({
        idloaikham: this.loaiKhamSelected,
        idbuongkham: this.phongKhamSelected,
        tinhthanh: this.tinhthanhSelected
      });
      this.getQuanHuyen();
      this.getXaPhuong();
    }, (error) => {
      console.log(error);
    });
    this.dangKyKhamBenhForm.get('tinhthanh').valueChanges.subscribe(data => {
      this.tinhthanhService.getAllHuyenByCodeTinh(data).subscribe((huyen: any) => {
        this.quanhuyen = huyen.quanhuyen;
        this.dangKyKhamBenhForm.patchValue({
          quanhuyen: this.quanhuyen
        });
      }, error => {
        console.log(error);
      });
    });
    // this.getXaPhuong();
  }

  initForm() {
    this.dangKyKhamBenhForm = this.fb.group({
      sothebhyt: ['HS4010123298834985'],
      noidkthebhyt: [null],
      diachitheothe: [null],
      makhuvuc: [null],
      hoten: [null, Validators.required],
      socmnd: [null],
      quoctich: ['Việt Nam'],
      tinhthanh: [null],
      diachinha: [null, Validators.required],
      noidungkham: [null],
      idloaikham: [null],
      benhvientruoc: [null],
      sohosobhyt: [null],
      ngaybatdau: [this.handau],
      ngayketthuc: [this.hancuoi],
      ngaysinh: [null, Validators.required],
      gioitinh: [null, Validators.required],
      dantoc: ['Kinh'],
      quanhuyen: [null],
      phuongxa: [null],
      dienthoai: [null, Validators.required],
      masothue: [null],
      idbuongkham: [null],
      chandoantuyenduoi: [null]
    });
  }

  getQuanHuyen() {
    this.tinhthanhService.getAllHuyenByCodeTinh(this.tinhthanhSelected).subscribe((data: any) => {
      // console.log(data);
      this.quanhuyen = data.quanhuyen;
    }, (error) => {
      console.log(error);
    });
  }

  getXaPhuong() {
    this.dangKyKhamBenhForm.get('quanhuyen').valueChanges.subscribe(data => {
      // console.log(data);
      if (data) {
        this.tinhthanhService.getAllXaByCodeHuyen(data).subscribe((px: any) => {
        // console.log(px.length === undefined);
        // console.log(px);
        // if (px.length === undefined) {
        //   this.dangKyKhamBenhForm.patchValue({
        //     phuongxa: null
        //   });
        // } else {
          this.phuongxa = px.phuongxa;
          this.dangKyKhamBenhForm.patchValue({
            phuongxa: this.phuongxa
          });
        // }
      }, error => {
        console.log(error);
      });
      }
    });
  }

  get f() {
    return this.dangKyKhamBenhForm.controls;
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
    benhnhan.diachi = this.dangKyKhamBenhForm.value.diachinha.toUpperCase() + '-' + this.dangKyKhamBenhForm.value.phuongxa;
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
