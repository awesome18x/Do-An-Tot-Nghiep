import { PhongKham } from './../../../../../models/phongkham';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DmkhoaphongService } from '../../../../../shared/services/dmkhoaphong.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private khoaPhongId: string;
  isLoading: boolean = false;
  createForm: FormGroup;
  getKhoaPhong: PhongKham;
  mode: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dmKhoaPhongService: DmkhoaphongService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('id')) {
        this.mode = 'update';
        this.khoaPhongId = paramMap.get('id');
        this.dmKhoaPhongService.getKhoaPhongById(this.khoaPhongId).subscribe((data: any) => {
          // console.log(data.DMKhoaPhong);
          this.getKhoaPhong = {
            _id: data.DMKhoaPhong._id,
            name: data.DMKhoaPhong.name,
            type: data.DMKhoaPhong.type,
            diaChi: data.DMKhoaPhong.diaChi,
            ma: data.DMKhoaPhong.ma
          };
          this.createForm.setValue({
            name: this.getKhoaPhong.name,
            type: this.getKhoaPhong.type,
            diaChi: this.getKhoaPhong.diaChi ?  this.getKhoaPhong.diaChi : '',
            ma: this.getKhoaPhong.ma ? this.getKhoaPhong.ma : ''
          });
          // console.log(this.getKhoaPhong);
          // data.DMKhoaPhong;
          // console.log(this.getKhoaPhong);
        }, (error) => {
          console.log(error);
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  initForm() {
    this.createForm = this.fb.group({
      type: [null , Validators.required],
      name: ['', Validators.required],
      diaChi: [''],
      ma: ['', Validators.required]
    });
  }



  returnPage() {
    this.router.navigate(['danhmuc/khoa-phong/list']);
  }

  onSubmit() {
    // console.log(this.createForm.value);
    if (this.createForm.invalid) {
      return;
    }
    if (this.mode === 'update') {
      this.dmKhoaPhongService.updatekhoaPhong(this.getKhoaPhong._id, this.createForm.value).subscribe(data => {
        this.toastrService.success('Cập nhật thay đổi thành công', 'Thành công');
        this.router.navigate(['danhmuc/khoa-phong/list']);
      }, (error) => {
        console.log(error);
      });
    } else {
      const khoaPhong = new PhongKham();
      khoaPhong.type = this.createForm.value.type;
      khoaPhong.name = this.createForm.value.name;
      khoaPhong.diaChi = this.createForm.value.diaChi;
      khoaPhong.ma = this.createForm.value.ma;
      this.dmKhoaPhongService.createKhoaPhong(khoaPhong).subscribe(data => {
        console.log(data);
        this.toastrService.success('Tạo mới khoa phòng thành công', 'Thành công');
        this.router.navigate(['danhmuc/khoa-phong/list']);
      }, (error) => {
        console.log(error);
      });
    }

  }

}
