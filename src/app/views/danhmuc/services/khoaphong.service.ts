import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhongKham } from '../../../models/phongkham';

@Injectable({
  providedIn: 'root'
})
export class KhoaphongService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getAllPhongKham(): Observable<PhongKham[]> {
    return this.http.get<PhongKham[]>(this.API_URL + 'api/dmkhoaphong?type=2');
  }

  getAllKhoaPhong(type: number): Observable<PhongKham[]> {
    const locloai = `?type=${type}`;
    return this.http.get<PhongKham[]>(this.API_URL + 'api/dmkhoaphong' + locloai);
  }

  getKhoaPhongById(id: string): Observable<PhongKham> {
    return this.http.get<PhongKham>(this.API_URL + `api/dmkhoaphong/${id}`);
  }

  updatekhoaPhong(id: string, khoaphong: PhongKham): Observable<PhongKham> {
    return this.http.put<PhongKham>(this.API_URL + `api/dmkhoaphong/${id}`, khoaphong);
  }

  deleteKhoaphong(id: string): Observable<PhongKham> {
    return this.http.delete<PhongKham>(this.API_URL + `api/dmkhoaphong/${id}`);
  }
}
