import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {

  private productSubject = new BehaviorSubject<Product | null>(null);

  product$ = this.productSubject.asObservable();

  setProduct(product: Product) {
    this.productSubject.next(product);
  }
}
