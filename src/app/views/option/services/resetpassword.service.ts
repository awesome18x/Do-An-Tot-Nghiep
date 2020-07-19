import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  resetPassword(oldPassword: string, newPassword: string, id: string) {
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.post<any>(this.API_URL + `api/user/reset-password/${id}`, body);
  }
}
