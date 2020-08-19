import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhongKham } from '../../models/phongkham';

@Injectable({
  providedIn: 'root'
})
export class DmkhoaphongService {

  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getAllPhongKham(type: number): Observable<PhongKham[]> {
    return this.http.get<PhongKham[]>(this.API_URL + `api/dmkhoaphong?type=${type}`);
  }

  getAllKhoaPhong(type: number, pageSize: number, pageIndex: number): Observable<PhongKham[]> {
    const queryString = `?type=${type}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this.http.get<PhongKham[]>(this.API_URL + 'api/dmkhoaphong' + queryString);
  }

  getKhoaPhongById(id: string): Observable<PhongKham> {
    return this.http.get<PhongKham>(this.API_URL + `api/dmkhoaphong/${id}`);
  }

  createKhoaPhong(khoaphong: PhongKham): Observable<PhongKham> {
    return this.http.post<PhongKham>(this.API_URL + 'api/dmkhoaphong/create', khoaphong);
  }

  updatekhoaPhong(id: string, khoaphong: PhongKham): Observable<PhongKham> {
    return this.http.put<PhongKham>(this.API_URL + `api/dmkhoaphong/${id}`, khoaphong);
  }

  deleteKhoaphong(id: string): Observable<PhongKham> {
    return this.http.delete<PhongKham>(this.API_URL + `api/dmkhoaphong/${id}`);
  }

}
