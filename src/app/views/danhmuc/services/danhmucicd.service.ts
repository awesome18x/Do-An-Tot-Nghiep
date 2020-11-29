import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICD } from '../../../models/icd';

@Injectable({
  providedIn: 'root'
})
export class DanhmucicdService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  createICD(body: ICD): Observable<ICD> {
    return this.http.post<ICD>(this.API_URL +  'api/dmicd/create', body);
  }

  getAllICD(): Observable<ICD[]> {
    return this.http.get<ICD[]>(this.API_URL +  'api/dmicd/get-all');
  }

  getICDById(id: string): Observable<ICD> {
    return this.http.get<ICD>(this.API_URL +  `api/dmicd/${id}`);
  }

  updateICD(id: string, body: ICD): Observable<ICD> {
    return this.http.put<ICD>(this.API_URL + `api/dmicd/${id}`, body);
  }

  deleteICD(id: string): Observable<ICD> {
    return this.http.delete<ICD>(this.API_URL + `api/dmicd/${id}`);
  }
}
