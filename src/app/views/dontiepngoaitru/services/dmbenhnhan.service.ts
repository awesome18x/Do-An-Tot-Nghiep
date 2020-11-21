import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DMBenhNhan } from '../../../models/dmbenhnhan';

@Injectable({
  providedIn: 'root'
})
export class DMBenhNhanService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  createDMBenhNhan(body: DMBenhNhan): Observable<DMBenhNhan> {
    return this.http.post<DMBenhNhan>(this.API_URL + 'api/dmbenhnhan/create', body);
  }

  getDSBenhNhanDenKham(idPhongKham: string, idLoaiKham: string, from: Date, to: Date): Observable<DMBenhNhan[]> {
    return this.http.get<DMBenhNhan[]>(this.API_URL + `api/hsphieukham/danhsach/dstiepdon?phongKham=${idPhongKham}&loaiKham=${idLoaiKham}&from=${from}&to=${to}`);
  }

  // getDSBenhNhanDenKham(idPhongKham: string, idLoaiKham: string, from: Date, to: Date): Observable<DMBenhNhan[]> {
  //   let body = {
  //     idPhongKham: idPhongKham,
  //     idLoaiKham: idLoaiKham,
  //     from: from,
  //     to: to
  //   };
  //   return this.http.post<DMBenhNhan[]>(this.API_URL + `api/hsphieukham/danhsach/dstiepdon`, body);
  // }
}
