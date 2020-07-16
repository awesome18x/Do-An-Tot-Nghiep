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
    return this.http.post<HSPhieuKham>(this.API_URL + 'hsphieukham', body);
  }
}
