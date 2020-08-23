import { HSChiDinhDVKT } from './../../../../models/hschidinhdvkt';
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
import { combineLatest, of } from 'rxjs';
import { HsphieuchidinhdvktService } from '../../service/hsphieuchidinhdvkt.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-phieukhamngoaitru',
  templateUrl: './phieukhamngoaitru.component.html',
  styleUrls: ['./phieukhamngoaitru.component.scss']
})
export class PhieukhamngoaitruComponent implements OnInit {
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private dschokhamService: DSChoKhamService,
    private modalService: NgbModal,
    private dvktService: DvktService,
    private congkhamService: CongkhamService,
    private hsPhieuChiDinhDVKT: HsphieuchidinhdvktService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap) => {
      if (params.get('id')) {
        const id = params.get('id');
        return this.dschokhamService.getPhieuKhamById(id).pipe(
          mergeMap((data: any) => {
            return combineLatest([of(data), this.congkhamService.getCongKhamTheoPhong(data.PhongKham._id)]);
          })
        );
      }
      return of(null);
    })).subscribe(result => {
      if (result) {
        this.phieukham = result[0];
        console.log(this.phieukham);
        this.nameCongkham = result[1][0];
      }
    }, (error) => {
      console.log(error);
    });

    this.nameBSKham = localStorage.getItem('hoten');
    this.getdvkt(this.type, this.pageSize, this.pageIndex);

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
      console.log('ddong');
      const hsChiDinhDVKT = new HSChiDinhDVKT();
      hsChiDinhDVKT.NguoiTao = localStorage.getItem('userID');
      hsChiDinhDVKT.NgayTao = new Date();
      hsChiDinhDVKT.NgayYLenh = new Date();
      hsChiDinhDVKT.idPhieuKham = this.phieukham._id;
      this.hsPhieuChiDinhDVKT.createHSChiDinhDVKT(hsChiDinhDVKT).subscribe((data: HSChiDinhDVKT[]) => {
        console.log(data);
        this.listDVKTCreated = data;
        this.toastrService.success('Chỉ định cận lâm sàng thành công', 'Thành công');
      }, (error) => {
        this.toastrService.error('Chỉ định cận lâm sàng thất bại');
        console.log(error);
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('jhkl');
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
  }

  removeCLS(index: number) {
    this.selectedListDVKT.splice(index, 1);
  }

}
