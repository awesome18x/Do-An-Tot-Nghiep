import { DMBenhNhan } from './../../../models/dmbenhnhan';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DanhsachdontiepService {
  API_URL = environment.API_URL;
  constructor(
    private httpClient: HttpClient
  ) { }

  getDanhSachBenhNhanDaDonTiep(): Observable<DMBenhNhan[]> {
    return this.httpClient.get<DMBenhNhan[]>(this.API_URL + 'api/dsTiepDonBenhNhan');
  }
}
