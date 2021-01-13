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
    return this.http.post<DMBenhAn>(this.API_URL + 'api/dmbenhan/create', body);
  }

  getAllBenhAn(pageSize: number, pageIndex: number): Observable<DMBenhAn[]> {
    return this.http.get<DMBenhAn[]>(this.API_URL + `api/dmbenhan?pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }

  deleteBenhAnById(id: string): Observable<DMBenhAn> {
    return this.http.delete<DMBenhAn>(this.API_URL + `api/dmbenhan/${id}`);
  }

  getDetailBenhAnById(id: string): Observable<DMBenhAn> {
    return this.http.get<DMBenhAn>(this.API_URL + `api/dmbenhan/${id}`);
  }

  updateBenhAnById(id: string, body: DMBenhAn): Observable<DMBenhAn> {
    return this.http.put<DMBenhAn>(this.API_URL + `api/dmbenhan/${id}`, body);
  }
}
