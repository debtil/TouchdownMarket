import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'http://localhost:4242/customer-data.json'; // adjust the URL to your server

  constructor(private http: HttpClient) { }

  getCustomerData(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise();
  }

}
