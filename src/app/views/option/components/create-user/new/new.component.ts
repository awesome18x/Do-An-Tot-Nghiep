import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../../models/phongkham';
import { KhoaphongService } from '../../../services/khoaphong.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  loading: boolean;
  submitted: boolean = false;
  createForm: FormGroup;
  phongKhams: PhongKham[] = [];
  selectedPK: PhongKham;
  constructor(
    private khoaPhongService: KhoaphongService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.khoaPhongService.getAllPhongKham().subscribe((data: any) => {
      console.log(data);
      this.phongKhams = data.dmKhoaPhong;
      // this.selectedPK = data.dmKhoaPhong[0];
    }, (error) => {
      console.log(error);
    });

    this.initForm();

  }

  initForm() {
    this.createForm = this.fb.group({
      khoaphong: [null, Validators.required],
      hoten: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      CCHN: ['', Validators.required],
      hocvi: [''],
      active: [true, Validators.required]
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.createForm.invalid) {
      this.loading = false;
      return;
    }
    // console.log(this.createForm.value);
    this.userService.createNewUser(this.createForm.value).subscribe(data => {
      this.loading = false;
      this.submitted = false;
      this.toastrService.success('Tạo mới tài khoản thành công');
      this.createForm.reset();
    }, (error) => {
      this.loading = false;
      console.log(error);
      this.toastrService.warning('Có lỗi xảy ra', 'Thất bại');
    });
  }

}
