import { LoaikhamService } from './../../../../dontiepngoaitru/services/loaikham.service';
import { Component, OnInit } from '@angular/core';
import { DMLoaiKham } from '../../../../../models/dmloaikham';

@Component({
  selector: 'app-list-loaikham',
  templateUrl: './list-loaikham.component.html',
  styleUrls: ['./list-loaikham.component.css']
})
export class ListLoaikhamComponent implements OnInit {
  listLoaiKham: DMLoaiKham[] = [];
  total: number;
  pageSize: number = 10;
  pageIndex: number = 1;
  constructor(
    private dmLoaiKhamService: LoaikhamService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  loadPage() {}

  openConfirmationDialog() {}

  getAll() {
    this.dmLoaiKhamService.getAllLoaiKham().subscribe((data: any) => {
      console.log(data);
      this.listLoaiKham = data.loaikham;
      this.total = data.count;
    }, (error) => {
      console.log(error);
    });
  }

}
