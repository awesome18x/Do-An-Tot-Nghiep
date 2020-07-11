import { PhongKham } from './../../../../../models/phongkham';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { KhoaphongService } from '../../../services/khoaphong.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private khoaPhongId: string;
  isLoading: boolean = false;
  createForm: FormGroup;
  khoaphong: PhongKham;
  getKhoaPhong: PhongKham;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private khoaPhongService: KhoaphongService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('id')) {
        this.khoaPhongId = paramMap.get('id');
        this.khoaPhongService.getKhoaPhongById(this.khoaPhongId).subscribe(data => {
          console.log(data);
        }, (error) => {
          console.log(error);
        });
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
    this.router.navigate(['/danhmuc/khoaphong/list']);
  }

  onSubmit() {
    // console.log(this.createForm.value);
    if (this.createForm.invalid) {
      return;
    }
    const khoaPhong = new PhongKham();
    khoaPhong.type = this.createForm.value.type;
    khoaPhong.name = this.createForm.value.name;
    khoaPhong.diachi = this.createForm.value.diaChi;
    khoaPhong.ma = this.createForm.value.ma;
    this.router.navigate(['/danhmuc/khoaphong/list']);
    // this.khoaPhongService.createKhoaPhong(khoaPhong).subscribe(data => {
    //   console.log(data);
    //   this.toastrService.success('Tạo mới khoa phòng thành công', 'Thành công');
    //   this.router.navigate(['../list']);
    // }, (error) => {
    //   console.log(error);
    // });

  }

}
