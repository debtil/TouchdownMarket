import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import {ProductCategory} from '../../utils/product-category.enum'
import { CartService } from '../../services/cart.service';
import { ProductStateService } from '../../services/product-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  currentSlide: number = 0;
  productCat = ProductCategory;
  limitedProducts: Product[] = [];

  bannerImgs: string[] = [
    'https://i.imgur.com/4q4CGO7.jpg',
    'https://i.imgur.com/qntVN52.jpg',
    'https://i.imgur.com/ZHPfQ8E.jpg',
    'https://i.imgur.com/z13mNBn.png',
    'https://i.imgur.com/aNNv5Q7.jpg',
  ]

  constructor(private ngZone: NgZone,private router: Router, private productStateService: ProductStateService, private productService: ProductService, @Inject(CartService) private cartService: CartService) { }

  ngOnInit(): void {
    this.ngZone.run(() =>{
      this.listProducts();
    });
  }

  listProducts(): void {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
      this.limitedProducts = this.products.slice(0, 10);
    });
  }

  getCategoryDisplayName(category: string): string {
    return this.productCat[category as keyof typeof ProductCategory];
  }

  goToProduct(product: Product){
    this.productStateService.setProduct(product);
    this.router.navigate(['/product']);
  }

  onAddToCart(product: Product): void{
    this.cartService.addToCart({
      images: product.images,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: 1,
      id: product.id,
      sizes: product.sizes
    });
  }
}
