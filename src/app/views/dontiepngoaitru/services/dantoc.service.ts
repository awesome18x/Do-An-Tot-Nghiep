import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DanToc } from '../../../models/dantoc';
import { Observable } from 'rxjs';

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
}
