import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HSPhieuKham } from '../../../models/hsphieukham';

@Injectable({
  providedIn: 'root'
})
export class DSChoKhamService {

  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getBNChoKham(status: number, idbuongkham: string, pageSize: number, pageIndex: number): Observable<HSPhieuKham[]> {
    return this.http.get<HSPhieuKham[]>(this.API_URL + `api/hsphieukham?status=${status}&idbuongkham=${idbuongkham}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }
  getPhieuKhamById(id: string): Observable<HSPhieuKham> {
    return this.http.get<HSPhieuKham>(this.API_URL + `api/hsphieukham/${id}`);
  }
}
