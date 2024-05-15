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
  customerData: CustomerData;

  constructor(private apiService: OrdersService) { }

 
}
