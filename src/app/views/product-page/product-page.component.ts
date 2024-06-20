import { Component } from '@angular/core';
import { ProductStateService } from '../../services/product-state.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  product: Product;
  selectedSize: string;

  constructor(private productService: ProductService,private productStateService: ProductStateService, private router: Router, private http: HttpClient, private cartService: CartService){}

   ngOnInit(): void{
    this.productStateService.product$.subscribe(async (product) =>{
      this.product = product;
      const productDetails = await this.productService.getProduct(product.id);
      this.product.quantity = productDetails.quantity;
    })
  }

  onAddToCart(product: Product): void {
    console.log('Adding product to cart:', product);
    this.cartService.addToCart({
      images: product.images,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: 1,
      id: product.id,
      sizes: [this.selectedSize],
    })
  }
}
