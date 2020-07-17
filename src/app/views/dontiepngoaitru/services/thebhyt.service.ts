import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DMTheBHYT } from '../../../models/dmthebhyt';

@Injectable({
  providedIn: 'root'
})
export class TheBHYTService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  createTheBHYT(body: DMTheBHYT): Observable<DMTheBHYT> {
    return this.http.post<DMTheBHYT>(this.API_URL + 'api/dmthebhyt', body);
  }
}
