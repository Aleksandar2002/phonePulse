import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPhone } from '../../interfaces/IPhone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPhonesService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/phones';

  addPhone(data: IPhone): Observable<IPhone> {
    return this.http.post<IPhone>(this.baseUrl, data);
  }

  // ISTO KO ZA DELETE
  updatePhone(phone: IPhone, id: string): Observable<IPhone> {
    return this.http.put<IPhone>(this.baseUrl + '/' + id, phone);
  }

  // PROVERI DA LI POSTOJI FON
  deletePhone(id: string): Observable<object> {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
