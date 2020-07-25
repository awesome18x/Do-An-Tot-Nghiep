import { zip } from 'rxjs';
import { KhoaphongService } from '../../../services/khoaphong.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../../models/phongkham';
import { DvktService } from '../../../services/dvkt.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newdvkt',
  templateUrl: './newdvkt.component.html',
  styleUrls: ['./newdvkt.component.css']
})
export class NewdvktComponent implements OnInit {
  createForm: FormGroup;
  buongkhams: PhongKham;
  khoaPhongs: PhongKham;
  constructor(
    private fb: FormBuilder,
    private khoaphongService: KhoaphongService,
    private dvktService: DvktService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    const call1 = this.khoaphongService.getAllPhongKham(2);
    const call2 = this.khoaphongService.getAllPhongKham(1);
    zip(call1, call2)
      .pipe(
        tap(([phongkham, khoakham]: any[]) => {
          this.buongkhams = phongkham.dmKhoaPhong;
          this.khoaPhongs = khoakham.dmKhoaPhong;
        })
      ).subscribe(data => {

      }, (error) => {
        console.log(error);
      });
    // zip(this.loaikhamService.getAllLoaiKham(), this.khoaPhongService.getAllPhongKham())
    // .pipe(
    //   tap(([loaiKham, phongKham]: any[]) => {
    //     this.loaiKhams = loaiKham.loaikham;
    //     this.loaiKhamSelected = loaiKham.loaikham[0]._id;
    //     this.phongKhams = phongKham.dmKhoaPhong;
    //     this.phongKhamSelected = phongKham.dmKhoaPhong[0]._id;
    //   })
    // )
    // .subscribe(() => {
    //   this.initForm();
    // }, (error) => {
    //   console.log(error);
    // });
    // sẽ sửa lại dùng forkJoin sau
    // this.khoaphongService.getAllPhongKham(2).subscribe((data: any) => {
    //   console.log(data);
    //   this.buongkhams = data.dmKhoaPhong;
    // }, (error) => {
    //   console.log(error);
    // });
    // this.khoaphongService.getAllPhongKham(1).subscribe((data: any) => {
    //   console.log(data);
    //   this.khoaPhongs = data.dmKhoaPhong;
    // }, (error) => {
    //   console.log(error);
    // });
  }

  initForm() {
    this.createForm = this.fb.group({
      type: ['1', Validators.required],
      madv: [''],
      name: [''],
      // donvi: ['Lần', Validators.required],
      giabh: [''],
      giadv: [''],
      buongthuchien: [''],
      khoathuchien: [''],
      active: [true]
    });
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }
    this.dvktService.createDVKT(this.createForm.value).subscribe(data => {
      console.log(data);
      this.toastrService.success('Tạo mới DVKT thành công', 'Thành công');
      this.router.navigate(['/danhmuc/dvkt']);
    }, (error) => {
      console.log(error);
    });
    // console.log(this.createForm.value);
  }

}
