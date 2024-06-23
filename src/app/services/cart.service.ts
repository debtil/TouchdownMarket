import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cart = new BehaviorSubject<Cart>({items: []});

constructor(){}

addToCart(item: Product):void{
  const items = [...this.cart.value.items];

  const itemInCart = items.find((_item) => _item.id === item.id);
  if(itemInCart){
    itemInCart.quantity += 1;
  }else{
    items.push(item);
  }

  this.cart.next({items});
}

removeFromCart(item: Product, updateCart = true): Product[]{
  const filteredItems = this.cart.value.items.filter(
    (_item) => _item.id !== item.id
  );

  if(updateCart){
    this.cart.next({items: filteredItems});
  }
  return filteredItems;
}

removeQuantity(item: Product): void{
  let itemForRemoval!: Product;

  let filteredItems = this.cart.value.items.map((_item) =>{
    if(_item.id === item.id){
      _item.quantity--;
      if(_item.quantity === 0){
        itemForRemoval = _item;
      }
    }
    return _item;
  });

  if(itemForRemoval){
    filteredItems = this.removeFromCart(itemForRemoval, false);
  }
  this.cart.next({ items: filteredItems });
}

  clearCart(): void {
    this.cart.next({ items: [] });
  }

  getTotal(items: Product[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}