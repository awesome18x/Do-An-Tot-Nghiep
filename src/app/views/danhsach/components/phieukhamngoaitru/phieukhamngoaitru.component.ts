import { HSChiDinhDVKT, DSChiDinhDVKT } from './../../../../models/hschidinhdvkt';
import { mergeMap, switchMap } from 'rxjs/operators';
import { PhongKham } from './../../../../models/phongkham';
import { HSPhieuKham } from './../../../../models/hsphieukham';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DSChoKhamService } from '../../service/dschokham.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DvktService } from '../../../danhmuc/services/dvkt.service';
import { DVKT } from '../../../../models/dvkt';
import { CongkhamService } from '../../service/congkham.service';
import { combineLatest, of, forkJoin } from 'rxjs';
import { HsphieuchidinhdvktService } from '../../service/hsphieuchidinhdvkt.service';
import { ToastrService } from 'ngx-toastr';
import { TrangThaiDVKT } from '../../../../constants/constants';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { HsphieukhamService } from '../../../dontiepngoaitru/services/hsphieukham.service';
import * as moment from 'moment';
@Component({
  selector: 'app-phieukhamngoaitru',
  templateUrl: './phieukhamngoaitru.component.html',
  styleUrls: ['./phieukhamngoaitru.component.scss']
})
export class PhieukhamngoaitruComponent implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit() {
    this.tien = 50000;
    this.initForm();
    this.initData();
    this.nameBSKham = localStorage.getItem('hoten');
    this.getdvkt(this.type, this.pageSize, this.pageIndex);
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
        if (this.phieukham.GioBatDauKham !== undefined) {
          this.isDuocKham = true;
        }

        // if (this.isDuocKham) {
          this.khamBenhForm.patchValue({
            DienBienBenh: this.phieukham.DienBienBenh,
            TienSuBenh: this.phieukham.TienSuBenh,
            ToanThan: this.phieukham.ToanThan,
            CacBoPhan: this.phieukham.CacBoPhan,
            ChanDoan: this.phieukham.ChanDoan,
            PPDieuTri: this.phieukham.PPDieuTri,
            Mach: this.phieukham.Mach,
            NhietDo: this.phieukham.NhietDo,
            HuyetApTren: this.phieukham.HuyetApTren,
            HuyetApDuoi: this.phieukham.HuyetApDuoi,
            NhipTho: this.phieukham.NhipTho,
            SPO2: this.phieukham.SPO2,
            CanNang: this.phieukham.CanNang,
            ChieuCao: this.phieukham.ChieuCao,
            LoiDan: this.phieukham.LoiDan,
            NgayTaiKham: this.phieukham.NgayTaiKham
          });
        // }

        // if (this.isDuocKham) {
        //   this.initForm();
        // }
        console.log(this.phieukham);
        this.nameCongkham = result[1][0];
        this.listDVKTByIdPhieuKham = result[2];
      }
    }, (error) => {
      console.log(error);
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
      console.log('jhkl');
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
      TrangThai: 2,
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

}
