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
  ngayBatDau = new Date();
  ngayKetThuc;
  hello: FormGroup;
  phongKhams: PhongKham[] = [];
  selectedPK: PhongKham;
  loaiKhams: LoaiKham[] = [];

  constructor(
    private khoaPhongService: DmkhoaphongService,
    private loaiKhamService: LoaikhamService,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>
  ) {
    // console.log(this.ngayBatDau);
  }


  ngOnInit(): void {
    // this.ngayBatDau = new Date().toISOString().split('T')[0];
    // console.log(this.ngayBatDau);
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
  }

  ngAfterViewInit() {
    // this.ngayBatDau  = new Date().toLocaleDateString('vi-VN');
  }

  onChange() {}

}
