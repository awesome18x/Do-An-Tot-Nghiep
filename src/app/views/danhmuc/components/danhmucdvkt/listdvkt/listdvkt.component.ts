import { Component, OnInit } from '@angular/core';
import { DvktService } from '../../../services/dvkt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DVKT } from '../../../../../models/dvkt';
import { DmkhoaphongService } from '../../../../../shared/services/dmkhoaphong.service';

@Component({
  selector: 'app-listdvkt',
  templateUrl: './listdvkt.component.html',
  styleUrls: ['./listdvkt.component.css']
})
export class ListdvktComponent implements OnInit {
  type: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  total: number;
  dvkts: any[] = [];
  constructor(
    private dmKhoaPhongService: DmkhoaphongService,
    private dvktService: DvktService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDVKT();
  }

  getDVKT() {
    this.dvktService.getAllDVKT(this.type, this.pageSize, this.pageIndex).subscribe((data: any) => {
      this.total = data.count;
      this.dvkts = data.dvkt;
      console.log(this.dvkts);
    }, error => {
      console.log(error);
    });
  }

  openConfirmationDialog() {}

  loadPage(page: number) {
    this.pageIndex = page;
    this.getDVKT();
  }
  changePage(type: number) {
    this.type = type;
    console.log(this.type);
    this.getDVKT();
  }

}
