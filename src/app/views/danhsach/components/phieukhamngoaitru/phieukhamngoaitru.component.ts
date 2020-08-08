import { mergeMap, switchMap } from 'rxjs/operators';
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
import { combineLatest, of } from 'rxjs';


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
  constructor(
    private activatedRoute: ActivatedRoute,
    private dschokhamService: DSChoKhamService,
    private modalService: NgbModal,
    private dvktService: DvktService,
    private congkhamService: CongkhamService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap) => {
        if (params.get('id')) {
          const id = params.get('id');
          this.dschokhamService.getPhieuKhamById(id).pipe(
            mergeMap((data: any) => {
              return combineLatest([of(data), this.congkhamService.getCongKhamTheoPhong(data.PhongKham._id)]);
            }
          ));
        }
        return of(null);
    })).subscribe(result => {
      if (result) {
        this.phieukham = result[0];
        console.log(result[0]);
        this.nameCongkham = result[1];
      }
    }, (error) => {
      console.log(error);
    });

    this.nameBSKham = localStorage.getItem('hoten');
    this.getdvkt(this.type, this.pageSize, this.pageIndex);

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
