import { zip } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../../models/phongkham';
import { DvktService } from '../../../services/dvkt.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DmkhoaphongService } from '../../../../../shared/services/dmkhoaphong.service';

@Component({
  selector: 'app-newdvkt',
  templateUrl: './newdvkt.component.html',
  styleUrls: ['./newdvkt.component.css']
})
export class NewdvktComponent implements OnInit {
  dvktCurrent: any;
  isLoading = false;
  idDVKT: string;
  submited: boolean;
  createForm: FormGroup;
  buongkhams: PhongKham;
  khoaPhongs: PhongKham;
  private mode: string = 'create'; // value: create khi tạo mới, mode khi chỉnh sửa, update
  constructor(
    private fb: FormBuilder,
    private dmKhoaPhongService: DmkhoaphongService,
    private dvktService: DvktService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.idDVKT = paramMap.get('id');
        this.isLoading = true;
        this.dvktService.getDVKTById(this.idDVKT).subscribe((data: any) => {
          console.log(data);
          this.dvktCurrent = data;
          this.mode = 'edit';
          this.createForm.patchValue({
            type: this.dvktCurrent.Type,
            madv: this.dvktCurrent.MaDV,
            name: this.dvktCurrent.Name,
            giabh: this.dvktCurrent.GiaBH,
            giadv: this.dvktCurrent.GiaDV,
            active: this.dvktCurrent.active,
            buongthuchien: this.dvktCurrent.BuongThucHien.map(i => i.name),
            khoathuchien: this.dvktCurrent.KhoaThucHien.map(i => i.name)
          });
        }, (error) => {
          console.log(error);
        });
      } else {
        this.mode = 'create';
        this.idDVKT = null;
      }
    });
    const call1 = this.dmKhoaPhongService.getAllPK();
    const call2 = this.dmKhoaPhongService.getAllKhoaNT();
    zip(call1, call2)
      .pipe(
        tap(([data1, data2]: any) => {
          this.buongkhams = data1;
          this.khoaPhongs = data2;
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
      madv: [null, Validators.required],
      name: [null, Validators.required],
      // donvi: ['Lần', Validators.required],
      giabh: [''],
      giadv: ['', Validators.required],
      buongthuchien: [null],
      khoathuchien: [null],
      active: [true]
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.submited = true;
    if (this.createForm.invalid) {
      return;
    }
    if (this.mode === 'create' ) {
      this.dvktService.createDVKT(this.createForm.value).subscribe(data => {
        // console.log(data);
        this.toastrService.success('Tạo mới DVKT thành công', 'Thành công');
        this.router.navigate(['/danhmuc/dvkt']);
        this.submited = false;
      }, (error) => {
        this.toastrService.warning('Có lỗi xảy ra', 'Thất bại');
        this.submited = false;
        console.log(error);
      });
    } else {
      // console.log(this.createForm.value);
      // return;
      this.dvktService.updateDVKT(this.idDVKT, this.createForm.value).subscribe(data => {
        // console.log(data);
        this.toastrService.success('Cập nhật DVKT thành công', 'Thành công');
        this.router.navigate(['/danhmuc/dvkt']);
        this.submited = false;
      }, (error) => {
        this.toastrService.warning('Có lỗi xảy ra', 'Thất bại');
        this.submited = false;
        console.log(error);
      });
    }
  }

  returnPage() {
    this.router.navigate(['/danhmuc/dvkt']);
  }

}
