import { ToastrService } from 'ngx-toastr';
import { ICD } from './../../../../../models/icd';
import { Component, OnInit } from '@angular/core';
import { DanhmucicdService } from '../../../services/danhmucicd.service';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-list-icd',
  templateUrl: './list-icd.component.html',
  styleUrls: ['./list-icd.component.css']
})
export class ListIcdComponent implements OnInit {
  total: number;
  listIcds: ICD[] = [];
  pageSize: number = 10;
  pageIndex: number = 1;
  constructor(
    private dmicd: DanhmucicdService,
    private confirmationDialogService: ConfirmDialogService,
    private toatsService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllIcd(this.pageSize, this.pageIndex);
  }

  getAllIcd(pageSize: number, pageIndex: number) {
    this.dmicd.getAllICD(pageSize, pageIndex).subscribe((data: any) => {
      this.total = data.count;
      this.listIcds = data.ICD;
      // console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  public openConfirmationDialog(id: string) {
    // console.log(id);
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn thực sự muốn xoá?')
    .then(confirmed => {
      if (confirmed) {
        this.dmicd.deleteICD(id).subscribe(data => {
          this.toatsService.success('Đã xoá thành công', 'Thành công');
          this.getAllIcd(this.pageSize, this.pageIndex);
        }, (error) => {
          this.toatsService.warning('Có lỗi xảy ra', 'Thất bại');
        });
      }
      // console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  loadPage(e: number) {
    this.pageIndex = e;
    this.getAllIcd(this.pageSize, this.pageIndex);
  }

}
