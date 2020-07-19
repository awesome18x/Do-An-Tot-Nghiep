import { User } from './../../../../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PhongKham } from '../../../../../models/phongkham';
import { KhoaphongService } from '../../../services/khoaphong.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  mode: boolean;
  loading: boolean;
  submitted: boolean = false;
  createForm: FormGroup;
  phongKhams: PhongKham[] = [];
  // selectedPK: PhongKham;
  user: User;
  constructor(
    private khoaPhongService: KhoaphongService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.get('id')) {
        this.mode = true;
        this.userService.getUserById(param.get('id')).subscribe((data: any) => {
          console.log(data);
          this.user = {
            _id: data.user._id,
            username: data.user.username,
            hocvi: data.user.hocvi,
            khoaphong: data.user.khoaphong._id,
            hoten: data.user.hoten,
            CCHN: data.user.CCHN,
            active: data.user.active
          };
          this.createForm.setValue({
            khoaphong: this.user.khoaphong ? this.user.khoaphong : null,
            hocvi: this.user.hocvi ? this.user.hocvi : '',
            hoten: this.user.hoten ? this.user.hoten : '',
            CCHN: this.user.CCHN ? this.user.CCHN : '',
            active: this.user.active ? this.user.active : false,
            username: this.user.username ? this.user.username : '',
            password: ''
          });
          console.log(this.user);
        }, (error) => {
          console.log(error);
        });
      }
    });

    this.khoaPhongService.getAllPhongKham().subscribe((data: any) => {
      this.phongKhams = data.dmKhoaPhong;
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
    if (this.mode === false && this.createForm.invalid) {
      this.loading = false;
      return;
    }
    if (this.mode === true) {
      this.loading = false;
      this.submitted = false;
      this.userService.updateUserById(
        this.createForm.value.hocvi,
        this.createForm.value.khoaphong,
        this.createForm.value.CCHN,
        this.createForm.value.active
        ).subscribe((data: any) => {
          console.log(data);
        }, (error) => {
          console.log(error);
      });
    } else {
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

  backPage() {
    this.router.navigate(['/option/create-user']);
  }

}
