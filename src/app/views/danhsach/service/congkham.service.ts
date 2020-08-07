import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CongkhamService {

  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getCongKhamTheoPhong(idbuongkham: string) {
    return this.http.get(this.API_URL + `api/dmdvkt/${idbuongkham}`);
  }
}
