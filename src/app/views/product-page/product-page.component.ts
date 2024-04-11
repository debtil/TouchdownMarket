import { Component } from '@angular/core';
import { ProductStateService } from '../../services/product-state.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  product: Product;

  constructor(private productStateService: ProductStateService, private router: Router, /*private checkoutService: CheckoutService*/){}

  handler: any = null;
  paymentHandler: any = null;

  ngOnInit(): void{
    this.productStateService.product$.subscribe((product) =>{
      this.product = product;
    })
  }
}
