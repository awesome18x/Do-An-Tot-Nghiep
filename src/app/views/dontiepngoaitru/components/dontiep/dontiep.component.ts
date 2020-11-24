import { ActivatedRoute } from '@angular/router';
import { TheBHYTService } from './../../services/thebhyt.service';
import { DMBenhNhan } from './../../../../models/dmbenhnhan';
import { DMTheBHYT } from './../../../../models/dmthebhyt';
import { HSPhieuKham } from './../../../../models/hsphieukham';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaikhamService } from '../../services/loaikham.service';
import { LoaiKham } from '../../../../models/loaikham';
import { zip, asapScheduler, of, forkJoin, from } from 'rxjs';
import { tap, flatMap, mergeMap, retry, map, concatMap, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { HsphieukhamService } from '../../services/hsphieukham.service';
import { AppAsideComponent } from '@coreui/angular';
import { DMBenhNhanService } from '../../services/dmbenhnhan.service';
import { ToastrService } from 'ngx-toastr';
import { TinhthanhService } from '../../services/tinhthanh.service';
import { DmkhoaphongService } from '../../../../shared/services/dmkhoaphong.service';
import { LoaiKhoaPhong } from '../../../../constants/constants';
import { LaythongtintheService } from '../../services/laythongtinthe.service';


@Component({
  selector: 'app-dontiep',
  templateUrl: './dontiep.component.html',
  styleUrls: ['./dontiep.component.css']
})
export class DontiepComponent implements OnInit {
  isXemLai: boolean = false;
  idBenhNhanDangTiepDon: string;
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
  public maskPhone = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  maskNgaySinh = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/];
  tuoi: number;

  constructor(
    private fb: FormBuilder,
    private khoaPhongService: DmkhoaphongService,
    private loaikhamService: LoaikhamService,
    private hsPhieuKhamService: HsphieukhamService,
    private theBHYTService: TheBHYTService,
    private dmBenhNhanService: DMBenhNhanService,
    private toastrService: ToastrService,
    private tinhthanhService: TinhthanhService,
    private layThongTinTheService: LaythongtintheService,
    private activatedRoute: ActivatedRoute
  ) {
    moment.locale();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        this.idBenhNhanDangTiepDon = params['id_benh_nhan'];
        if (this.idBenhNhanDangTiepDon !== undefined) {
          return this.hsPhieuKhamService.getThongTinPhieuKham(this.idBenhNhanDangTiepDon);
        } else {
          return of({});
        }
      // console.log(this.idBenhNhanDangTiepDon);
      })).subscribe((data: any) => {
        if (JSON.stringify(data) !== '{}') {
          this.isXemLai = true;
          this.dangKyKhamBenhForm.patchValue({
            sothebhyt: data.SoTheBHYT ? data.SoTheBHYT : '',
            noidkthebhyt: data.TheBHYT.DiaChiTheoThe ? data.TheBHYT.DiaChiTheoThe : '',
            diachitheothe: data.TheBHYT.NoiDKKCBBD ? data.TheBHYT.NoiDKKCBBD : '',
            ngaybatdau: data.TheBHYT.HanDau ? data.TheBHYT.HanDau : '',
            ngayketthuc: data.TheBHYT.HanCuoi ? data.TheBHYT.HanCuoi : '',
            hoten: data.HoTen,
            gioitinh: data.BenhNhan.GioiTinh,
            ngaysinh: data.BenhNhan.NgaySinh,
            dienthoai: data.BenhNhan.SDT ? data.BenhNhan.SDT : '',
            masothue: data.BenhNhan.MaSoThue ? data.BenhNhan.MaSoThue : '',
            quoctich: data.BenhNhan.QuocTich ? data.BenhNhan.QuocTich : '',
            idbuongkham: data.PhongKham._id,
          });
        }
      }, (error) => {
        console.log(error);
      }
    );

    this.initForm();
    zip(
      this.loaikhamService.getAllLoaiKham(),
      this.khoaPhongService.getAllPhongKham(LoaiKhoaPhong.PhongKham), this.tinhthanhService.getAllTinhThanh())
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

  onKey(event) {
    // const showAge = this.maskNgaySinh.test(event.target.value);
    // console.log(showAge);
    this.tuoi = moment().diff(event.target.value, 'years', false);
  }

  onSubmit() {
    // Trường hợp cập nhật lại lần đón tiếp
    if (this.isXemLai) {

    }
    // từ đón tiếp => tạo ra 3 bảng 1 lúc
    const thebhyt = new DMTheBHYT();
    const benhnhan = new DMBenhNhan();
    const phieukham = new HSPhieuKham();

    // create DMBenhNhan
    benhnhan.hoten = this.dangKyKhamBenhForm.value.hoten;
    benhnhan.ngaysinh = moment(this.dangKyKhamBenhForm.value.ngaysinh).format('DD/MM/YYYY');
    benhnhan.gioitinh = +this.dangKyKhamBenhForm.value.gioitinh;
    benhnhan.socmnd = this.dangKyKhamBenhForm.value.socmnd;
    benhnhan.quoctich = this.dangKyKhamBenhForm.value.quoctich;
    benhnhan.dantoc = this.dangKyKhamBenhForm.value.dantoc;
    benhnhan.sdt = this.dangKyKhamBenhForm.value.dienthoai.replace(/ /g, '');
    benhnhan.masothue = this.dangKyKhamBenhForm.value.masothue;
    benhnhan.diachi = this.dangKyKhamBenhForm.value.diachinha.toUpperCase() + ' - ' + this.dangKyKhamBenhForm.value.phuongxa;
    benhnhan.tuoi = +this.tuoi;
    // console.log(benhnhan);

    // create DMTheBHYT
    thebhyt.sothebhyt = this.dangKyKhamBenhForm.value.sothebhyt;
    thebhyt.noidangkythe = this.dangKyKhamBenhForm.value.noidkthebhyt;
    thebhyt.diachitheothe = this.dangKyKhamBenhForm.value.diachitheothe;
    thebhyt.handau = moment(this.dangKyKhamBenhForm.value.ngaybatdau).format('DD/MM/YYYY');
    thebhyt.hancuoi = this.dangKyKhamBenhForm.value.ngayketthuc;
    thebhyt.makhuvuc = this.dangKyKhamBenhForm.value.makhuvuc;
    // console.log(thebhyt);
    // return;

    // create HSPhieuKham
    phieukham.hoten = this.dangKyKhamBenhForm.value.hoten;
    phieukham.idbuongkham = this.dangKyKhamBenhForm.value.idbuongkham;
    phieukham.idloaikham = this.dangKyKhamBenhForm.value.idloaikham;
    phieukham.sothebhyt = this.dangKyKhamBenhForm.value.sothebhyt;
    phieukham.ngaydontiep = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    phieukham.benhvientruoc = this.dangKyKhamBenhForm.value.benhvientruoc;
    phieukham.chandoantuyenduoi = this.dangKyKhamBenhForm.value.chandoantuyenduoi;
    phieukham.isbhyt = true;
    phieukham.trangthai = 1;
    phieukham.idbacsykham = null;
    phieukham.createdAt = moment(new Date()).format();
    // console.log(phieukham);


    const createTheBHYT = this.theBHYTService.createTheBHYT(thebhyt);
    const createDMBenhNhan = this.dmBenhNhanService.createDMBenhNhan(benhnhan);

    // giả sử ko có BHYT:
    //   - Chỉ có 2 bảng được insert dữ liệu là HSPhieuKham và DMBenhNhan
    //   - Cách giải quyết ntn:
    //     + Lấy được id bệnh nhân trước rồi mới insert dữ liệu vào HSPhieuKham
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
          this.resetForm();
          console.log(data);
        }, (error) => {
          console.log(error);
        });
    }
  }

  resetForm() {
    this.dangKyKhamBenhForm.reset(this.dangKyKhamBenhForm.value);
  }


  // layThongTinTuCongBHXH() {
  //   this.layThongTinTheService.layPhienDangNhap().subscribe((data: string) => {
  //     console.log(data);
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }


  layThongTinBenhNhanTuCongBHXH() {
    this.layThongTinTheService.layPhienDangNhap().pipe(
      concatMap((data: any) => {
        return this.layThongTinTheService.layThongTinTheCuaNguoiBenh(
          this.dangKyKhamBenhForm.value.sothebhyt,
          this.dangKyKhamBenhForm.value.hoten,
          this.dangKyKhamBenhForm.value.ngaysinh,
          '2', '01004',
          moment(this.dangKyKhamBenhForm.value.ngaybatdau).format('YYYY-MM-DD[T00:00:00.000Z]'),
          moment(this.dangKyKhamBenhForm.value.ngayketthuc).format('YYYY-MM-DD[T00:00:00.000Z]'),
          data.APIKey.access_token,
          data.APIKey.id_token
        );
      })
    ).subscribe(data => {
      if (data && data.maKetQua === '070') {
        this.toastrService.warning('Ngày sinh của bệnh nhân không đúng, đã cập nhật lại ngày sinh', 'Cảnh báo');
      }
      if (data && data.maKetQua === '000') {
        this.toastrService.success('Thông tin thẻ chính xác');
      }
      if (data && data.maKetQua === '010') {
        this.toastrService.warning('Thẻ bảo hiểm đã hết giá trị sử dụng', 'Cảnh báo');
      }
      if (data && data.maKetQua === '050') {
        this.toastrService.warning('Thông tin thẻ không đúng, vui lòng kiểm tra lại', 'Cảnh báo');
      }
      if (data && data.maKetQua === '080') {
        this.toastrService.warning('Thẻ sai giới tính, đã cập nhật lại giới tính', 'Cảnh báo');
      }
      if (data && data.maKetQua === '090') {
        this.toastrService.warning('Thẻ sai nơi đăng ký KCBBD, đã cập nhật lại nơi đăng ký KCBBD', 'Cảnh báo');
      }

      this.dangKyKhamBenhForm.patchValue({
        hoten: data.hoTen,
        diachitheothe: data.diaChi,
        ngaybatdau: data.gtTheTu,
        ngayketthuc: data.gtTheDen,
        ngaysinh: data.ngaySinh,
        gioitinh: data.gioiTinh === 'Nam' ? '1' : '2',
      });
    }, (error) => {
      console.log(error);
    });
  }

}
