import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DMBenhNhan } from '../../../models/dmbenhnhan';

@Injectable({
  providedIn: 'root'
})
export class DMBenhNhanService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  createDMBenhNhan(body: DMBenhNhan): Observable<DMBenhNhan> {
    return this.http.post<DMBenhNhan>(this.API_URL + 'api/dmbenhnhan', body);
  }
}
