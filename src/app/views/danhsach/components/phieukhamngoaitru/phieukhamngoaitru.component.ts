import { mergeMap } from 'rxjs/operators';
import { PhongKham } from './../../../../models/phongkham';
import { HSPhieuKham } from './../../../../models/hsphieukham';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DSChoKhamService } from '../../service/dschokham.service';
import { FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DvktService } from '../../../danhmuc/services/dvkt.service';
import { DVKT } from '../../../../models/dvkt';
import { CongkhamService } from '../../service/congkham.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-phieukhamngoaitru',
  templateUrl: './phieukhamngoaitru.component.html',
  styleUrls: ['./phieukhamngoaitru.component.scss']
})
export class PhieukhamngoaitruComponent implements OnInit {
  congkhamInBuongKham: DVKT[] = [];
  type: number = 0; // lấy tất cả dịch vụ kỹ thuật ra
  pageSize: number = 20;
  pageIndex: number = 1;
  listDVKT: any[] = [];
  phieukham: any;
  khamBenhForm: FormGroup;
  closeResult = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private dschokhamService: DSChoKhamService,
    private modalService: NgbModal,
    private dvktService: DvktService,
    private congkhamService: CongkhamService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.get('id')) {
        const id = param.get('id');
        this.dschokhamService.getPhieuKhamById(id).pipe(
          // dựa theo id này sẽ biết được phiếu khám này là của bệnh nhân nào, đang khám ở phòng khám nào
          mergeMap((data: any) => {
            // data là kết quả của this.dschokhamService.getPhieuKhamById(id)
            // result là dựa vào kết quả data trả về có idphongkham,
            // từ idphongkham đó gọi  this.congkhamService.getCongKhamTheoPhong để lấy được công khám
            return combineLatest({ data:  of(data), result: this.congkhamService.getCongKhamTheoPhong(data.PhongKham)});
          }

          // em muốn trả về 2 data đồng thời
        ).subscribe((result: any) => {
          console.log(result);
        }, (error) => {
          console.log(error);
        });
      }
    });
    this.getdvkt(this.type, this.pageSize, this.pageIndex);
    // await this.congkhamService.getCongKhamTheoPhong(this.phieukham.PhongKham).subscribe(data => {
    //   console.log(data);
    // }, (error) => {
    //   console.log(error);
    // });
  }

  getdvkt(type: number, pageSize: number, pageIndex: number) {
    this.dvktService.getAllDVKT(type, pageSize, pageIndex).subscribe((data: any) => {
      console.log(data);
      this.listDVKT = data.dvkt;
    }, error => {
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

}
