import { HSChiDinhDVKT } from './../../../models/hschidinhdvkt';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HsphieuchidinhdvktService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  createHSChiDinhDVKT(body: HSChiDinhDVKT) {
    return this.http.post(this.API_URL + `api/hschidinhdvkt/create`, body);
  }
}
