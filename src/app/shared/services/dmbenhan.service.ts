import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DMBenhAn } from '../../models/dmbenhan';

@Injectable({
  providedIn: 'root'
})
export class DmbenhanService {

  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  createBenhAn(body: DMBenhAn): Observable<DMBenhAn> {
    return this.http.post<DMBenhAn>(this.API_URL, body);
  }
}
