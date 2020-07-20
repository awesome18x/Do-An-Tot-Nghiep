import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../../models/phongkham';
import { KhoaphongService } from '../../../services/khoaphong.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../../confirm-dialog/confirm-dialog.service';
import { Router } from '@angular/router';

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
    private khoaPhongService: KhoaphongService,
    private confirmationDialogService: ConfirmDialogService,
    private toatsService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getKhoaPhong(this.type, this.pageSize, this.pageIndex);
  }

  getKhoaPhong(type: number, pageSize: number, pageIndex: number) {
    this.khoaPhongService.getAllKhoaPhong(this.type, this.pageSize, this.pageIndex).subscribe((data: any) => {
      this.totalItems = data.count;
      this.khoaPhongs = data.dmKhoaPhong;
      /*
        thử xem có đc ko? pagination
      */
    });
  }

  onChange(type: number) {
    this.type = type;
    this.getKhoaPhong(this.type, this.pageSize, this.pageIndex);
  }

  public openConfirmationDialog(id: string) {
    console.log(id);
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn thực sự muốn xoá?')
    .then(confirmed => {
      if (confirmed) {
        this.khoaPhongService.deleteKhoaphong(id).subscribe(data => {
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
