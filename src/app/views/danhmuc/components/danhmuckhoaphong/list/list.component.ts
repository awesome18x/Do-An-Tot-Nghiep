import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../../models/phongkham';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DmkhoaphongService } from '../../../../../shared/services/dmkhoaphong.service';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  show: boolean = true;
  type: number = 3;
  pageSize: number = 10;
  pageIndex: number = 1;
  selectedPK: string;
  totalItems: number;
  khoaPhongs: PhongKham[] = [];
  constructor(
    private dmKhoaPhongService: DmkhoaphongService,
    private confirmationDialogService: ConfirmDialogService,
    private toatsService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getKhoaPhong(this.type, this.pageSize, this.pageIndex);
  }

  getKhoaPhong(type: number, pageSize: number, pageIndex: number) {
    this.dmKhoaPhongService.getAllKhoaPhong(this.type, this.pageSize, this.pageIndex).subscribe((data: any) => {
      this.totalItems = data.count;
      this.khoaPhongs = data.dmKhoaPhong;
      /*
        thử xem có đc ko? pagination
      */
    });
  }

  onChange(type: number) {
    // this.type = type;
    // console.log(type);
    this.getKhoaPhong(type, this.pageSize, this.pageIndex);
  }

  public openConfirmationDialog(id: string) {
    // console.log(id);
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn thực sự muốn xoá?')
    .then(confirmed => {
      if (confirmed) {
        this.dmKhoaPhongService.deleteKhoaphong(id).subscribe(data => {
          this.toatsService.success('Đã xoá thành công', 'Thành công');
          this.getKhoaPhong(this.type, this.pageSize, this.pageIndex);
        }, (error) => {
          this.toatsService.warning('Có lỗi xảy ra', 'Thất bại');
        });
      }
      // console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  loadPage(page: number) {
    this.pageIndex = page;
    this.getKhoaPhong(this.type, this.pageSize, this.pageIndex);
  }

  create() {
    this.router.navigateByUrl('danhmuc/khoaphong/create-or-update');
  }

  update(id: string) {
    console.log(id);
    this.router.navigate(['danhmuc/khoaphong/create-or-update', id]);
  }

}
