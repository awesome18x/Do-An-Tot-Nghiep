import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinhthanhService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getAllTinhThanh(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + 'api/dmtinhthanh');
  }

  getAllHuyenByCodeTinh(code: string): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + `api/dmquanhuyen/${code}`);
  }
  getAllXaByCodeHuyen(code: string): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + `api/xaphuong?code=${code}`);
  }
}
