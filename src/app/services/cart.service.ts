import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: any[] = [];

  constructor() {
    if (typeof localStorage!== 'undefined') {
      this.items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    } else if (typeof sessionStorage!== 'undefined') {
      this.items = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    } else {
      console.log('Web storage is not supported in this environment');
    }
  }

  addToCart(product: Product){
    const index = this.items.findIndex((i) => i.id == product.id);
    if(index == -1){
      this.items.push({...product, quantity: 1});
      alert('Produto adicionado ao carrinho!')
    }else{
      this.items[index].quantity++;
      alert('Produto adicionado ao carrinho!')
    }

    this.saveToStorage();
  }

  getItems(){
    return this.items;
  }

  deleteFromCart(item: any){
    this.items = this.items.filter((i) => i.id!== item.id);

    this.saveToStorage();
  }

  incrementQuantity(id: number){
    let item = this.items.find((i) => i.id === id);
    if(item){
      item.quantity++;
    }

    this.saveToStorage();
  }

  decrementQuantity(id: number){
    let item = this.items.find((i) => i.id === id);
    if(item){
      item.quantity--;
      if(item.quantity < 1){
        item.quantity = 1;
        alert("Deve ser selecionado ao mínimo uma unidade para prosseguir com a compra!")
      }
    }

    this.saveToStorage();
  }

  getTotal(){
    return this.items.reduce((acc, item) =>{
      return acc + item.price * item.quantity;
    }, 0);
  }

  private saveToStorage() {
    if (typeof localStorage!== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    } else if (typeof sessionStorage!== 'undefined') {
      sessionStorage.setItem('cartItems', JSON.stringify(this.items));
    } else {
      console.log('Web storage is not supported in this environment');
    }
  }
}