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
}
