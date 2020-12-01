import { DMLoaiKham } from './../../../models/dmloaikham';
import { LoaiKham } from './../../../models/loaikham';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaikhamService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getAllLoaiKham(): Observable<DMLoaiKham[]> {
    return this.http.get<DMLoaiKham[]>(this.API_URL + 'api/dmloaikham')
    .pipe();
  }

  createLoaiKham(body: DMLoaiKham):  Observable<DMLoaiKham>{
    return this.http.post<DMLoaiKham>(this.API_URL + 'api/dmloaikham/create', body);
  }
}
