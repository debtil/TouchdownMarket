import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: any[] = [];

  constructor(){}

  addToCart(product: Product){
    this.items.push(product);
  }

  getItems(){
    return this.items;
  }

  deleteFromCart(item: any){
    this.items = this.items.filter((i) => i.id !== item.id);
  }
}
