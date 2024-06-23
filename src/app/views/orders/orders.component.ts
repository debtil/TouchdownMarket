import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

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
      console.log('erro ao dar fetch na api: ', error)
    })
  }  
}
