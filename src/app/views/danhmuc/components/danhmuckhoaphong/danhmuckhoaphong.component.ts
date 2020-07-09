import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../models/phongkham';
import { KhoaphongService } from '../../services/khoaphong.service';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-danhmuckhoaphong',
  templateUrl: './danhmuckhoaphong.component.html',
  styleUrls: ['./danhmuckhoaphong.component.css']
})
export class DanhmuckhoaphongComponent implements OnInit {
  type: number = 3;
  selectedPK: string;
  total: number;
  khoaPhongs: PhongKham[] = [];
  constructor(
    private khoaPhongService: KhoaphongService,
    private confirmationDialogService: ConfirmDialogService,
    private toatsService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getKhoaPhong(this.type);
  }

  getKhoaPhong(type: number) {
    this.khoaPhongService.getAllKhoaPhong(this.type).subscribe((data: any) => {
      // console.log(data);
      this.khoaPhongs = data.dmKhoaPhong;
      console.log(this.khoaPhongs);
      this.total = data.count;
    });
  }

  onChange(type: number) {
    this.type = type;
    this.getKhoaPhong(this.type);
  }

  public openConfirmationDialog(id: string) {
    console.log(id);
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn thực sự muốn xoá?')
    .then(confirmed => {
      if (confirmed) {
        this.khoaPhongService.deleteKhoaphong(id).subscribe(data => {
          this.toatsService.success('Đã xoá thành công', 'Thành công');
          this.getKhoaPhong(this.type);
        }, (error) => {
          this.toatsService.warning('Có lỗi xảy ra', 'Thất bại');
        });
      }
      // console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
