import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DVKT } from '../../../models/dvkt';

@Injectable({
  providedIn: 'root'
})
export class DvktService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getAllDVKT(type: number, pageSize: number, pageIndex: number): Observable<DVKT[]> {
    // type= 0 lay tat ca
    const queryString = `?pageSize=${pageSize}&pageIndex=${pageIndex}&type=${type}`;
    return this.http.get<DVKT[]>(this.API_URL + 'api/dmDVKT' + queryString);
  }

  getDVKTById(id: string): Observable<DVKT> {
    return this.http.get<DVKT>(this.API_URL + `api/dmDVKT/${id}`);
  }

  createDVKT(body: DVKT): Observable<DVKT> {
    return this.http.post<DVKT>(this.API_URL + 'api/dmDVKT/create',  body);
  }

  updateDVKT(id: string,  body: DVKT): Observable<DVKT> {
    return this.http.put<DVKT>(this.API_URL + `api/dmDVKT/${id}`,  body);
  }

  deleteDVKTById(id: string): Observable<DVKT> {
    return this.http.delete<DVKT>(this.API_URL + `api/dmDVKT/${id}`);
  }
}
