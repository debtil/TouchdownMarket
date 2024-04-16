import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { Cart, CartItem } from '../../models/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Cart = {items: []};

  
  cartSubscription: Subscription | undefined;

  cartService = inject(CartService);
  http = inject(HttpClient);

  ngOnInit(): void{
  
  }

  onCheckout(): void{
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items,
    }).subscribe(async (res: any) =>{
      let stripe = await loadStripe('pk_test_51OG3cBLnrzag1vMqsb0IX306T43vJgy2Cy7FpG76qZgWLGo8slQXaYCYCkYnYlcLQiWxQ5g36CBivEZ0XzLsKKmz00uhkzxg41');
      stripe?.redirectToCheckout({
        sessionId: res.id,
      });
    });
  }

  ngOnDestroy(){
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe();
    }
  }

  deleteFromCart(item: any){
    this.cartService.deleteFromCart(item);
  }
}
