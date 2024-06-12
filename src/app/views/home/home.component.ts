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
  autoSlideInterval: any;

  bannerImgs: string[] = [
    '../../../assets/banner.jpeg',
    '../../../assets/banner2.png',
    '../../../assets/banner3.jpg',
    '../../../assets/banner4.jpg',
    '../../../assets/banner5.jpg',
  ]

  constructor(private ngZone: NgZone,private router: Router, private productStateService: ProductStateService, private productService: ProductService, @Inject(CartService) private cartService: CartService) { }

  ngOnInit(): void {
    this.ngZone.run(() =>{
      this.listProducts();
    });
    this.startAutoSlide();
  }

  listProducts(): void {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.bannerImgs.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.bannerImgs.length - 1) ? 0 : this.currentSlide + 1;
  }

  getCategoryDisplayName(category: string): string {
    return this.productCat[category as keyof typeof ProductCategory];
  }

  goToProduct(product: Product){
    this.productStateService.setProduct(product);
    this.router.navigate(['/product']);
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Muda o slide a cada 3 segundos
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
