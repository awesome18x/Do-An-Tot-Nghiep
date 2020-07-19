import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  createNewUser(body: any): Observable<User> {
    return this.http.post<User>(this.API_URL + 'api/user/signup', body);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + 'api/user/get-all');
  }
}
