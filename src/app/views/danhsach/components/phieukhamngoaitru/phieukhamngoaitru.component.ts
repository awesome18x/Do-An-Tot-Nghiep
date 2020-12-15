import { HSChiDinhDVKT, DSChiDinhDVKT } from './../../../../models/hschidinhdvkt';
import { mergeMap, switchMap, concatMap, delay, tap } from 'rxjs/operators';
import { PhongKham } from './../../../../models/phongkham';
import { HSPhieuKham } from './../../../../models/hsphieukham';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, Injectable } from '@angular/core';
import { DSChoKhamService } from '../../service/dschokham.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDatepickerI18n, NgbDateStruct, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DvktService } from '../../../danhmuc/services/dvkt.service';
import { DVKT } from '../../../../models/dvkt';
import { CongkhamService } from '../../service/congkham.service';
import { combineLatest, of, forkJoin } from 'rxjs';
import { HsphieuchidinhdvktService } from '../../service/hsphieuchidinhdvkt.service';
import { ToastrService } from 'ngx-toastr';
import { TrangThaiDVKT, TrangThaiKhamBenh, LoaiKhoaPhong } from '../../../../constants/constants';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { HsphieukhamService } from '../../../dontiepngoaitru/services/hsphieukham.service';
import * as moment from 'moment';
import { DanhmucicdService } from '../../../danhmuc/services/danhmucicd.service';
import { ICD } from '../../../../models/icd';
import { DmkhoaphongService } from '../../../../shared/services/dmkhoaphong.service';
import { format, parseISO, differenceInDays } from 'date-fns';
import { formatDate } from '@angular/common';


const I18N_VALUES = {
  'vi': {
    weekdays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    months: ['Thg1', 'Thg2', 'Thg3', 'Thg4', 'Thg5', 'Thg6', 'Thg7', 'Thg8', 'Thg9', 'Thg10', 'Thg11', 'Thg12'],
  }
  // other languages you would support
};
@Injectable()
export class I18n {
  language = 'vi';
}
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}



@Component({
  selector: 'app-phieukhamngoaitru',
  templateUrl: './phieukhamngoaitru.component.html',
  styleUrls: ['./phieukhamngoaitru.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class PhieukhamngoaitruComponent implements OnInit {
  soNgayHenKham: number;
  model: any;
  tongTienCLS: number;
  isHaveICDMain: boolean = false;
  isHaveICDKemTheo: boolean = false;
  id_default: string; // id phong khám hiện tại
  phongKhams: PhongKham[] = [];
  HuongXuTri = [
    {id: 1, name: 'Về'},
    {id: 2, name: 'Chuyển Phòng Khám'},
    {id: 3, name: 'Chuyển Tuyến'},
    {id: 4, name: 'Lập Bệnh Án Ngoại Trú'},
    {id: 5, name: 'Chuyển Vào Viện'},
    {id: 6, name: 'Huỷ Khám'}
  ];
  hxtValue: number;
  selectedIcd: FormGroup;
  isDuocKham: boolean = false;
  idPhieuKham: string;
  nameBSKham: string;
  nameCongkham: any;
  congkhamInBuongKham: DVKT[] = [];
  type: number = 0; // lấy tất cả dịch vụ kỹ thuật ra
  pageSize: number = 20;
  pageIndex: number = 1;
  listDVKT: any[] = [];
  phieukham: any;
  khamBenhForm: FormGroup;
  closeResult = '';
  selectedListDVKT: any[] = [];
  listDVKTCreated: HSChiDinhDVKT[] = [];
  listDVKTByIdPhieuKham: DSChiDinhDVKT[] = [];
  tien: number;
  listICDs: ICD[] = [];
  icdMainSelected: ICD;
  icdPhus = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dschokhamService: DSChoKhamService,
    private modalService: NgbModal,
    private dvktService: DvktService,
    private congkhamService: CongkhamService,
    private hsPhieuChiDinhDVKT: HsphieuchidinhdvktService,
    private toastrService: ToastrService,
    private confirmationDialogService: ConfirmDialogService,
    private hsPhieuKhamService: HsphieukhamService,
    private fb: FormBuilder,
    private router: Router,
    private dmicdService: DanhmucicdService,
    private dmkhoaPhongService: DmkhoaphongService
  ) { }

  async ngOnInit() {
    this.tien = 50000;
    await this.initForm();
    await this.initData();
    this.nameBSKham = localStorage.getItem('hoten');
    this.getdvkt(this.type, this.pageSize, this.pageIndex);
    this.initFormICD();
    this.fetchICD();
    this.dmkhoaPhongService.getAllPhongKham(LoaiKhoaPhong.PhongKham).subscribe((data: any) => {
      this.phongKhams = data.dmKhoaPhong;
      this.id_default = data.dmKhoaPhong[0]._id;
      // this.getListBNChoKham(this.status_chokham, this.id_default, this.pageSize, this.pageIndex);
      // this.getListBNDangKham(this.id_default, this.pageSize, this.pageIndexDangKham);
    }, (error) => {
      console.log(error);
    });

    this.khamBenhForm.get('ngaytaikham').valueChanges.subscribe(data => {
      if (data) {
        data = moment(data, 'DD-MM-YYYY');
        const today = moment(new Date(), 'DD-MM-YYYY');
        if (data.diff(today, 'days') < 0) {
          this.toastrService.warning('Bạn không thể hẹn khám vào 1 ngày trong quá khứ');
          this.khamBenhForm.patchValue({
            ngaytaikham: ''
          });
          return;
        }
        this.soNgayHenKham = data.diff(today, 'days') + 1;
      }
    });
  }

  initData() {
    this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap) => {
      if (params.get('id')) {
        this.idPhieuKham = params.get('id');
        return this.dschokhamService.getPhieuKhamById(this.idPhieuKham).pipe(
          mergeMap((data: any) => {
            return forkJoin([
              of(data),
              this.congkhamService.getCongKhamTheoPhong(data.PhongKham._id),
              this.hsPhieuChiDinhDVKT.getHSChiDinhDVKTByPhieuKham(this.idPhieuKham)
            ]);
          })
        );
      }
      return of(null);
    })).subscribe(result => {
      if (result) {
        // console.log(result);
        this.phieukham = result[0];
        if (this.phieukham.idMaBenhChinh && this.phieukham.idMaBenhChinh.name) {
          this.isHaveICDMain = true;
        }
        if (this.phieukham.idMaBenhKemTheo && this.phieukham.idMaBenhKemTheo.length !== 0) {
          this.isHaveICDKemTheo = true;
        }
        if (this.isHaveICDKemTheo) {
          this.icdPhus = [];
          this.phieukham.idMaBenhKemTheo.map(it => {
            this.icdPhus.push(it._id);
          });
        }
        console.log(this.phieukham);
        if (this.phieukham.GioBatDauKham !== undefined && this.phieukham.GioBatDauKham !== null) {
          this.isDuocKham = true;
        }


        if (this.isDuocKham) {
          this.khamBenhForm.patchValue({
            dienbien: this.phieukham.DienBienBenh,
            tiensu: this.phieukham.TienSuBenh,
            toanthan: this.phieukham.ToanThan,
            cacbophan: this.phieukham.CacBoPhan,
            chandoan: this.phieukham.ChanDoan,
            ppdt: this.phieukham.PPDieuTri,
            mach: this.phieukham.Mach,
            nhietdo: this.phieukham.NhietDo,
            hatoida: this.phieukham.HuyetApTren,
            hatoithieu: this.phieukham.HuyetApDuoi,
            nhiptho: this.phieukham.NhipTho,
            spo2: this.phieukham.SPO2,
            cannang: this.phieukham.CanNang,
            chieucao: this.phieukham.ChieuCao,
            loidan: this.phieukham.LoiDan,
            ngaitaikham: formatDate(this.phieukham.NgayTaiKham, 'mm/dd/yyyy', 'vi')
          });
        }

        // if (this.isDuocKham) {
        //   this.initForm();
        // }
        this.nameCongkham = result[1][0];
        this.listDVKTByIdPhieuKham = result[2];
      }
    }, (error) => {
      console.log(error);
    });
  }

  initFormICD() {
    this.selectedIcd = this.fb.group({
      ma: [''],
      name: ['']
    });
  }

  initForm() {
    // if (!this.isDuocKham) {
    //   this.khamBenhForm = this.fb.group({
    //     dienbien: [{value: '', disabled: true}],
    //     tiensu: [{value: '', disabled: true}],
    //     toanthan: [{value: '', disabled: true}],
    //     cacbophan: [{value: '', disabled: true}],
    //     chandoan: [{value: '', disabled: true}],
    //     ppdt: [{value: '', disabled: true}],
    //     mach: [{value: '', disabled: true}],
    //     nhietdo: [{value: '', disabled: true}],
    //     hatoida: [{value: '', disabled: true}],
    //     hatoithieu: [{value: '', disabled: true}],
    //     nhiptho: [{value: '', disabled: true}],
    //     spo2: [{value: '', disabled: true}],
    //     cannang: [{value: '', disabled: true}],
    //     chieucao: [{value: '', disabled: true}],
    //     loidan: [''],
    //     ngaytaikham: ['']
    //   });
    // } else {
      this.khamBenhForm = this.fb.group({
        dienbien: [''],
        tiensu: [''],
        toanthan: [''],
        cacbophan: [''],
        chandoan: [''],
        ppdt: [''],
        mach: [''],
        nhietdo: [''],
        hatoida: [''],
        hatoithieu: [''],
        nhiptho: [''],
        spo2: [''],
        cannang: [''],
        chieucao: [''],
        loidan: [''],
        ngaytaikham: ['']
      });
    // }
  }

  fetchICD() {
    this.dmicdService.getAllICD(15, 1).subscribe((data: any) => {
      this.listICDs = data.ICD;
      // console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  getdvkt(type: number, pageSize: number, pageIndex: number) {
    this.dvktService.getAllDVKT(type, pageSize, pageIndex).subscribe((data: any) => {
      this.listDVKT = data.dvkt;
    }, error => {
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const queries$ = this.selectedListDVKT.map((item) => {
        const hsChiDinhDVKT = new HSChiDinhDVKT();
        hsChiDinhDVKT.NguoiTao = localStorage.getItem('userID');
        hsChiDinhDVKT.NgayTao = new Date();
        hsChiDinhDVKT.NgayYLenh = new Date();
        hsChiDinhDVKT.idPhieuKham = this.idPhieuKham;
        hsChiDinhDVKT.KetQua = 'Chưa có kết quả';
        hsChiDinhDVKT.SoLuong = 1;
        hsChiDinhDVKT.IsThanhToan = false;
        hsChiDinhDVKT.TrangThai = TrangThaiDVKT.DaChiDinh;
        hsChiDinhDVKT.IsBHYT = true;
        hsChiDinhDVKT.MaDVKT = item.MaDVKT;
        hsChiDinhDVKT.TenDVKT = item.Name.trim();
        hsChiDinhDVKT.DonGiaBH = item.GiaBH;
        hsChiDinhDVKT.DonGiaDV = item.GiaDV;
        hsChiDinhDVKT.idDVKT = item._id;
        return this.hsPhieuChiDinhDVKT.createHSChiDinhDVKT(hsChiDinhDVKT);
      });
      forkJoin(queries$).subscribe((data: HSChiDinhDVKT[]) => {
          this.listDVKTCreated = data;
          // this.toastrService.success('Chỉ định cận lâm sàng thành công');
          if (this.listDVKTByIdPhieuKham.length > 0) {
            this.toastrService.success('Cập nhật cận lâm sàng thành công');
          } else {
            this.toastrService.success('Chỉ định cận lâm sàng thành công');
          }
          this.initData();
      }, (error) => {
          this.toastrService.error('Chỉ định cận lâm sàng thất bại');
          console.log(error);
        });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getListDVKTDaChiDinh() {
    this.hsPhieuChiDinhDVKT.getHSChiDinhDVKTByPhieuKham(this.idPhieuKham).subscribe(data => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  show(item: any) {
    this.selectedListDVKT.push(item);
    console.log(this.selectedListDVKT);
  }

  removeCLS(index: number) {
    this.selectedListDVKT.splice(index, 1);
  }

  deleteDVKT(item: DSChiDinhDVKT) {
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn thực sự muốn xoá chỉ định này?')
    .then(confirmed => {
      if (confirmed) {
        this.hsPhieuChiDinhDVKT.deleteOneOfDSCDDVKT(item._id).subscribe(data => {
          this.toastrService.success('Đã xoá thành công', 'Thành công');
          this.initData();
        }, (error) => {
          this.toastrService.warning('Có lỗi xảy ra', 'Thất bại');
        });
      }
      // console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  startKhamBenh() {
    this.isDuocKham = true;
    const data = {
      GioBatDauKham: moment(new Date()).format(),
      TrangThai: TrangThaiKhamBenh.DangKham,
      BacSyKham: localStorage.getItem('userID')
    };
    this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, data).subscribe(
      (data: any) => {
        // console.log(data);
        if (data.msg === 'Update HSPhieuKham thanh cong') {
          this.toastrService.success('Bắt đầu khám bệnh thành công', 'Thành công');
          this.initData();
        }
      }, (error) => {
        console.log(error);
        this.toastrService.warning('Có lỗi xảy ra', 'Thất bại');
      }
    );
  }


  saveTamThoi() {
    // console.log(this.khamBenhForm.value);
    const data = {
      DienBienBenh: this.khamBenhForm.value.dienbien,
      TienSuBenh: this.khamBenhForm.value.tiensu,
      ToanThan: this.khamBenhForm.value.toanthan,
      CacBoPhan: this.khamBenhForm.value.cacbophan,
      ChanDoan: this.khamBenhForm.value.chandoan,
      PPDieuTri: this.khamBenhForm.value.ppdt,
      Mach: this.khamBenhForm.value.mach,
      NhietDo: this.khamBenhForm.value.nhietdo,
      HuyetApTren: this.khamBenhForm.value.hatoida,
      HuyetApDuoi: this.khamBenhForm.value.hatoithieu,
      NhipTho: this.khamBenhForm.value.nhiptho,
      SPO2: this.khamBenhForm.value.spo2,
      CanNang: this.khamBenhForm.value.cannang,
      ChieuCao: this.khamBenhForm.value.chieucao,
      LoiDan: this.khamBenhForm.value.loidan,
      NgayTaiKham: this.khamBenhForm.value.ngaytaikham
    };

    this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, data).subscribe(data => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.router.navigate(['/danhsach/danh-sach-cho-kham']);
  }

  openICD(contenticd) {
    // this.modalService.open(contenticd, { size: 'lg' });
    const modalRef = this.modalService.open(contenticd, {
      size: 'lg',
      windowClass: 'config-modal',
      centered: true
    });
    // modalRef.componentInstance.lesson = lesson;

  }

  resetFormIcd() {
    this.selectedIcd.reset();
  }

  exitForm() {
    this.router.navigate(['/danhsach/danh-sach-cho-kham']);
  }

  pickIcdMain(item: ICD) {
    const body = {
      idMaBenhChinh: item
    };

    // this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, body)
    //   .pipe(
    //     concatMap(data => {
    //       return of(data).pipe(delay(200));
    //     })
    //   ).subscribe(data => {
    //     this.toastrService.success('Đã chỉ định ICD chính cho bệnh nhân');
    //     this.isHaveICDMain = true;
    //     this.modalService.dismissAll();
    //   }, (error) => {
    //     console.log(error);
    //   });

    this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, body).subscribe(data => {
      this.isHaveICDMain = true;
      this.toastrService.success('Đã chỉ định ICD chính cho bệnh nhân');
      this.modalService.dismissAll();
    }, (error) => {
      console.log(error);
    });
  }

  pickIcdKemTheo(item: ICD) {
    // console.log('duynv1', this.isHaveICDKemTheo);
    // return;
    if (!this.isHaveICDKemTheo) {
      const body = {
        idMaBenhKemTheo: item
      };
      this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, body).subscribe(data => {
        this.toastrService.success('Đã chỉ định ICD phụ cho bệnh nhân');
        this.modalService.dismissAll();
        this.initData();
      }, (error) => {
        console.log(error);
      });
    } else {
      this.icdPhus.push(item._id);
      const body = {
        idMaBenhKemTheo: this.icdPhus
      };
      this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, body).subscribe(data => {
        this.toastrService.success('Đã chỉ định ICD phụ cho bệnh nhân');
        this.modalService.dismissAll();
        this.initData();
      }, (error) => {
        console.log(error);
      });
    }

  }

  selectKetLuan(e) {
    this.hxtValue = +(e.target.value).substring(0, 1);
  }

  chuyenBNDenPhongKhamMoi() {

  }

  lapBenhAnNoiTru() {

  }

  removeICDChinh() {
    const body = {
      idMaBenhChinh: null
    };
    this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, body).subscribe(data => {
      this.isHaveICDMain = false;
      this.modalService.dismissAll();
    }, (error) => {
      console.log(error);
    });
  }

  removeICDKemTheo(item) {
    this.icdPhus = this.icdPhus.filter(it => it !== item._id);
    const bodyUpdate = {
      idMaBenhKemTheo: this.icdPhus
    };
    this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, bodyUpdate).subscribe(data => {
      if (this.icdPhus.length === 0) {
        this.isHaveICDKemTheo = false;
      }
      this.modalService.dismissAll();
      this.initData();
    }, (error) => {
      console.log(error);
    });
  }


  ketThucKhamBenh() {
    if (!this.isHaveICDMain) {
      this.toastrService.warning('Bạn chưa chỉ định ICD chính cho bệnh nhân');
      return;
    }

    if (this.khamBenhForm.value.ngaytaikham !== null && this.khamBenhForm.value.ngaytaikham !== '') {
      const body = {
        NgayTaiKham: this.khamBenhForm.value.ngaytaikham
      };
      this.hsPhieuKhamService.updateThongTinPhieuKham(this.idPhieuKham, body).subscribe(data => {
        console.log('Đã hẹn ngày tái khám cho bệnh nhân');
      }, (error) => {
        console.log(error);
      });
    }
  }

}
