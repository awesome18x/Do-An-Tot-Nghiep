import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LaythongtintheService {

  APIURL = 'http://egw.baohiemxahoi.gov.vn/api/';
  username = '01004_BV';
  password = 'a1a36231f427a9dbe82f403b6ede448c';
  constructor(
    private http: HttpClient
  ) { }

  layPhienDangNhap(): Observable<string> {
    const credentials = {
      username: this.username,
      password: this.password
    };
    return this.http.post<string>(this.APIURL + 'token/take', credentials, httpOptions).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly
      console.error('An error occured:', error.error.message);
    } else {
      // The backend returned an unsuccessful respone code.
      // The response body may contain clues as to what was wrong
      console.log(
        `Backend returned code ${error.status}, body was: ${error.status}`
      );
    }

    // return an observable wuth a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }


  layThongTinTheCuaNguoiBenh(maThe: string, hoTen: string, ngaySinh: string,
    gioiTinh: string, maCSKCB: string, ngayBD: string, ngayKT: string, access_token: string, id_token: string): Observable<any> {
    const theBHYT = {
      maThe: maThe,
      hoTen: hoTen,
      ngaySinh: ngaySinh,
      gioiTinh: gioiTinh,
      maCSKCB: maCSKCB,
      ngayBD: ngayBD ? ngayBD : null,
      ngayKT: ngayKT ? ngayKT : null
    };

    return this.http.post<any>(this.APIURL + `egw/NhanLichSuKCB2018?token=${access_token}&id_token=${id_token}&username=${this.username}&password=${this.password}`, theBHYT, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
