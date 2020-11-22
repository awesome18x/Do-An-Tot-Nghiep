import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HSPhieuKham } from '../../../models/hsphieukham';

@Injectable({
  providedIn: 'root'
})
export class HsphieukhamService {

  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  createHSPhieuKham(body: HSPhieuKham): Observable<HSPhieuKham> {
    return this.http.post<HSPhieuKham>(this.API_URL + 'api/hsphieukham/create', body);
  }

  getDSPhieuKham(
    idPhongKham: string, idLoaiKham: string,
    from: any, to: any, pageSize: number, pageIndex: number): Observable<HSPhieuKham[]> {
    return this.http.get<HSPhieuKham[]>(this.API_URL + `api/hsphieukham/danhsach/dstiepdon?phongKham=${idPhongKham}&loaiKham=${idLoaiKham}&from=${from}&to=${to}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }


  // updatePhieuKham(body: any, idPhieuKham: string): Observable<HSPhieuKham> {
  //   return this.http.put<HSPhieuKham>(this.API_URL + `api/hsphieukham/${idPhieuKham}`, body);
  // }
}
