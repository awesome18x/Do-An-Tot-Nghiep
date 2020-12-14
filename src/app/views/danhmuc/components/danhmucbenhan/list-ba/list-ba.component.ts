import { DMBenhAn } from './../../../../../models/dmbenhan';
import { Component, OnInit } from '@angular/core';
import { DmbenhanService } from '../../../../../shared/services/dmbenhan.service';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-ba',
  templateUrl: './list-ba.component.html',
  styleUrls: ['./list-ba.component.css']
})
export class ListBaComponent implements OnInit {
  total: number;
  pageSize: number = 10;
  pageIndex: number = 1;
  listBenhAns: DMBenhAn[] = [];
  constructor(
    private dmbenhanService: DmbenhanService,
    private confirmationDialogService: ConfirmDialogService,
    private toatsService: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.dmbenhanService.getAllBenhAn(this.pageSize, this.pageIndex).subscribe((data: any) => {

      this.listBenhAns = data.dmbenhan;
      console.log(this.listBenhAns);
      this.total = data.count;
    }, (error) => {
      console.log(error);
    });
  }

  public openConfirmationDialog(id: string) {
    console.log(id);
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn thực sự muốn xoá?')
    .then(confirmed => {
      if (confirmed) {
        this.dmbenhanService.deleteBenhAnById(id).subscribe(data => {
          this.toatsService.success('Đã xoá thành công', 'Thành công');
          this.fetchData();
        }, (error) => {
          this.toatsService.warning('Có lỗi xảy ra', 'Thất bại');
        });
      }
      // console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  loadPage(pageCurrent: number) {
    this.pageIndex = pageCurrent;
  }

}
