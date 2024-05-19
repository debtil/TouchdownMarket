import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { HttpClient } from '@angular/common/http';

interface CustomerData {
  customer: any;
  cartItems: any;
  totalPrice: any;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  customerData: any[] = [];

  constructor(private apiService: OrdersService) { }

  ngOnInit(){
    this.apiService.getCustomerData().subscribe(data =>{
      this.customerData = data.customerData;
    }, error =>{
      console.log('erro ao dar fetch na api')
    })
  }  
}
