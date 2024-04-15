import { Component } from '@angular/core';
import { ProductStateService } from '../../services/product-state.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  product: Product;

  constructor(private productStateService: ProductStateService, private router: Router, /*private checkoutService: CheckoutService,*/ private http: HttpClient){}

  handler: any = null;
  paymentHandler: any = null;

  ngOnInit(): void{
    this.productStateService.product$.subscribe((product) =>{
      this.product = product;
    })
  }

  onCheckout(): void{
    this.http.post('http://localhost:4242/checkout', {
      item: this.product
    }).subscribe(async (res: any) =>{
      let stripe = await loadStripe('pk_test_51OG3cBLnrzag1vMqsb0IX306T43vJgy2Cy7FpG76qZgWLGo8slQXaYCYCkYnYlcLQiWxQ5g36CBivEZ0XzLsKKmz00uhkzxg41');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }
}
