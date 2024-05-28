import { Component, inject } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Cart = {items: []};
  cartSubscription: Subscription | undefined;
  dataSource: CartItem[] = [];
  cartService = inject(CartService);
  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = this.formBuilder.group({
      cep: ['', [Validators.required, Validators.pattern(/^[0-9]{5}-[0-9]{3}$/)]]
    });
  }

  ngOnInit(): void{
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }

  onCheckout(): void{
    /*if (this.checkoutForm.invalid) {
      alert('Por favor, insira um CEP válido.');
      return;
    }*/

    const cep = this.checkoutForm.value.cep;

    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items,
      //cepDestino: cep,
    }).subscribe(async (res: any) =>{
      let stripe = await loadStripe('pk_test_51OG3cBLnrzag1vMqsb0IX306T43vJgy2Cy7FpG76qZgWLGo8slQXaYCYCkYnYlcLQiWxQ5g36CBivEZ0XzLsKKmz00uhkzxg41');
      stripe?.redirectToCheckout({
        sessionId: res.id,
      });
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(){
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe();
    }
  }

  /*deleteFromCart(item: any){
    this.cartService.deleteFromCart(item);
  }*/
}
