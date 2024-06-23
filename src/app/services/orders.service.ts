import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'https://touchdownmarket-server.onrender.com/customer-data';

  constructor(private http: HttpClient) { }

  getCustomerData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
