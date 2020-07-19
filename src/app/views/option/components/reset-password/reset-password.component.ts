import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from './_helper/must-match.validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading: boolean;
  submitted = false;
  resetPasswordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.userService.resetPassword(this.resetPasswordForm.value.oldPassword, this.resetPasswordForm.value.newPassword).subscribe(data => {
      this.loading = false;
      this.submitted = false;
      this.toastrService.success('Thay đổi mật khẩu thành công');
      this.resetPasswordForm.reset();
    }, (error) => {
      this.loading = false;
      this.submitted = false;
      this.toastrService.warning('Có lỗi xảy ra', 'Thất bại');
      console.log(error);
    });
  }

}
