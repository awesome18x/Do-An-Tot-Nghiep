import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DanToc } from '../../../models/dantoc';

@Injectable({
  providedIn: 'root'
})
export class DantocService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getAllDanToc(): Observable<DanToc[]> {
    return this.http.get<DanToc[]>(this.API_URL + 'api/dantoc');
  }

  getDanTocById(id: string): Observable<DanToc> {
    return this.http.get<DanToc>(this.API_URL + `api/dantoc/${id}`);
  }

  createDanToc(dantoc: DanToc): Observable<DanToc> {
    return this.http.post<DanToc>(this.API_URL + 'api/dantoc/create', dantoc);
  }

  updateDantoc(id: string, dantoc: DanToc): Observable<DanToc> {
    return this.http.put<DanToc>(this.API_URL + `api/dantoc/${id}`, dantoc);
  }

  deleteDanTocById(id: string): Observable<DanToc> {
    return this.http.delete<DanToc>(this.API_URL + `api/dantoc/${id}`);
  }
}
