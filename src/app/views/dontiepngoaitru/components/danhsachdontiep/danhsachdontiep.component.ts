import { ToastrService } from 'ngx-toastr';
import { HsphieukhamService } from './../../services/hsphieukham.service';
import { DMBenhNhanService } from './../../services/dmbenhnhan.service';
import { LoaiKhoaPhong } from './../../../../constants/constants';
import { Component, OnInit, DoCheck, Injectable, AfterViewInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { FormGroup } from '@angular/forms';
import { DmkhoaphongService } from '../../../../shared/services/dmkhoaphong.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { LoaikhamService } from '../../services/loaikham.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaiKham } from '../../../../models/loaikham';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDate, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as dateFns from 'date-fns';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';

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
  selector: 'app-danhsachdontiep',
  templateUrl: './danhsachdontiep.component.html',
  styleUrls: ['./danhsachdontiep.component.css'],
  providers: [
    I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ] // define custom NgbDatepickerI18n provider

})
export class DanhsachdontiepComponent implements OnInit, AfterViewInit {
  totalItems: number;
  pageSize: number = 10;
  pageIndex: number = 1;
  ngayBatDau: Date;
  ngayKetThuc: Date;
  hello: FormGroup;
  phongKhams: PhongKham[] = [];
  selectedPK: PhongKham;
  loaiKhams: LoaiKham[] = [];
  dsBenhNhanDaDonTiep: [];
  totalResult: number;
  idPhongKham: string = '';
  idLoaiKham: string;

  constructor(
    private khoaPhongService: DmkhoaphongService,
    private loaiKhamService: LoaikhamService,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
    private dmBenhNhanService: DMBenhNhanService,
    private hsPhieuKhamService: HsphieukhamService,
    private router: Router,
    private notification: ToastrService,
    private confirmationDialogService: ConfirmDialogService
  ) {
    this.ngayBatDau = new Date(Date.now()) ;
    this.ngayKetThuc = new Date(Date.now());
  }


  ngOnInit(): void {

    forkJoin([
      this.khoaPhongService.getAllPhongKham(LoaiKhoaPhong.PhongKham),
      this.loaiKhamService.getAllLoaiKham()
    ]).pipe(
      tap(([phongkham, loaikham]: any[]) => {
        this.phongKhams = phongkham.dmKhoaPhong;
        // console.log(loaikham);
        this.loaiKhams = loaikham.loaikham;
      }
    )).subscribe(() => {
    }, (error) => {
      console.log(error);
    });

    this.dsBenhNhanDenKhamTrongNgay();
  }

  ngAfterViewInit() {
    // this.ngayBatDau  = new Date().toLocaleDateString('vi-VN');
  }


  dsBenhNhanDenKhamTrongNgay() {
    this.hsPhieuKhamService
      .getDSPhieuKham(
        this.idPhongKham,
        this.idLoaiKham,
        moment(this.ngayBatDau).startOf('day').format('YYYY-MM-DD[T00:00:00.000Z]'),
        moment(this.ngayKetThuc).add(1, 'days').endOf('day').format('YYYY-MM-DD[T00:00:00.000Z]'),
        this.pageSize,
        this.pageIndex
      )
      .subscribe((data: any) => {
        this.totalItems = data.soLuong;
        this.dsBenhNhanDaDonTiep = data.data;
        console.log(this.dsBenhNhanDaDonTiep);
      }, (error) => {
        console.log(error);
      });
  }

  onChange() {}

  loadPage(pageCurrent: number) {
    this.pageIndex = pageCurrent;
    this.dsBenhNhanDenKhamTrongNgay();
  }

  loadPageByPK(idPhongKham: string) {
    this.pageIndex = 1;
    this.idPhongKham = idPhongKham;
    this.dsBenhNhanDenKhamTrongNgay();
  }

  loadPageByStartDate(date) {
    console.log(date);
  }

  goToDonTiep(item) {
    this.router.navigate(
      ['dontiep/don-tiep-benh-nhan'], {
        queryParams: {
          id_benh_nhan: item._id
        }
      });
  }

  cancelDonTiep(item) {
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn muốn huỷ đón tiếp bệnh nhân này?')
    .then(confirmed => {

      if (confirmed) {
        const newData = {
          TrangThai: 4
        };
        this.hsPhieuKhamService.huyLuotDonTiep(item._id, newData).subscribe(
          (data: any) => {
            if (data.msg === 'Update HSPhieuKham thanh cong') {
              this.notification.success('Thành công', 'Huỷ lượt khám thành công');
            }
            this.dsBenhNhanDenKhamTrongNgay();
            // console.log(data);
          }
        // tslint:disable-next-line:no-unused-expression
        ), (error) => {
          this.notification.warning('Có lỗi xảy ra', 'Thất bại');
        };
      }
      // console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
