import { HSChiDinhDVKT } from './../../../models/hschidinhdvkt';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HsphieuchidinhdvktService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  createHSChiDinhDVKT(body: HSChiDinhDVKT): Observable<HSChiDinhDVKT> {
    return this.http.post<HSChiDinhDVKT>(this.API_URL + `api/hschidinhdvkt/create`, body);
  }

  getHSChiDinhDVKTByPhieuKham(id: string): Observable<HSChiDinhDVKT[]> {
    return this.http.get<HSChiDinhDVKT[]>(this.API_URL + `api/hschidinhdvkt/${id}`);
  }


}
