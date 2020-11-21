import { HSChiDinhDVKT, DSChiDinhDVKT } from './../../../../models/hschidinhdvkt';
import { mergeMap, switchMap } from 'rxjs/operators';
import { PhongKham } from './../../../../models/phongkham';
import { HSPhieuKham } from './../../../../models/hsphieukham';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DSChoKhamService } from '../../service/dschokham.service';
import { FormGroup, FormArray } from '@angular/forms';
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

@Component({
  selector: 'app-phieukhamngoaitru',
  templateUrl: './phieukhamngoaitru.component.html',
  styleUrls: ['./phieukhamngoaitru.component.scss']
})
export class PhieukhamngoaitruComponent implements OnInit {
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
    private hsPhieuKhamService: HsphieukhamService

  ) { }

  ngOnInit() {
    this.tien = 50000;
    this.initData();

    this.nameBSKham = localStorage.getItem('hoten');
    this.getdvkt(this.type, this.pageSize, this.pageIndex);
    // this.hsPhieuKhamService.
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
        this.phieukham = result[0];
        // console.log(this.phieukham);
        this.nameCongkham = result[1][0];
        this.listDVKTByIdPhieuKham = result[2];
        // console.log(this.listDVKTByIdPhieuKham);
      }
    }, (error) => {
      console.log(error);
    });
  }

  updateHSPhieuKham() {
    this.hsPhieuKhamService.updatePhieuKham().subscribe(data => {
      console.log(data);
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

}
