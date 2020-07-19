import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      if (localStorage.getItem('token')) {
        this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  forgotPass() {
    alert('Xin vui lòng liên hệ Phòng CNTT của bệnh viện để được cấp lại tài khoản!');
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  }

}
