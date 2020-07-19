import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  createNewUser(body: any): Observable<User> {
    return this.http.post<User>(this.API_URL + 'api/user/signup', body);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + 'api/user/all');
  }

  getUserById(id: string) {
    return this.http.get<User>(this.API_URL + `api/user/${id}`);
  }

  resetPassword(oldPassword: string, newPassword: string) {
    const id = localStorage.getItem('userID');
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.post<any>(this.API_URL + `api/user/change-password/${id}`, body);
  }

  updateUserById(hocvi: string, khoaphong: string, CCHN: string, active: boolean): Observable<User> {
    const id = localStorage.getItem('userID');
    const body = {
      hocvi: hocvi,
      khoaphong: khoaphong,
      CCHN: CCHN,
      active: active
    };
    return this.http.put<any>(this.API_URL + `api/user/update-user/${id}`, body);
  }
}
