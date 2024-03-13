import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  products: any[];
  constructor(private productService: ProductService){}

  ngOnInit() {

      this.listProducts();

  }

  listProducts(){
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }
}
