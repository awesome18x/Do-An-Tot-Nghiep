import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { AuthData } from '../../../models/authdata';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userID: string;
  private hoten: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  getToken() {
    return this.token;
  }
  /*
    Check xem đã đăng nhập hay chưa
    Return true or false
  */
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string) {
    const authData: AuthData = {
      username,
      password
    };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(username: string, password: string) {
    const authData: AuthData = {
      username,
      password
    };
    this.http
      .post<{ token: string; expiresIn: number; user: any}>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(response => {
        if (!response) {
          alert('Sai mật khẩu hoặc password, vui lòng kiểm tra lại');
        }
        console.log(response);
        const token = response.token;
        this.token = token;
        this.userID = response.user._id;
        this.hoten = response.user.hoten;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          localStorage.setItem('userID', this.userID);
          localStorage.setItem('hoten', this.hoten);
          this.toastrService.success('Đăng nhập thành công', 'Thành công');
          this.router.navigate(['/']);
        }
      }, (error) => {
        alert('Sai mật khẩu hoặc password, vui lòng kiểm tra lại');
        console.log('Có lỗi xảy ra: ', error);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
    localStorage.removeItem('hoten');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}
