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

  getAllLoaiKham(): Observable<LoaiKham[]> {
    return this.http.get<LoaiKham[]>(this.API_URL + 'api/dmloaikham')
    .pipe();
  }
}
