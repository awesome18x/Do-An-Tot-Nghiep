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

  constructor() {}

  ngOnInit() {}

}
