import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductStateService } from '../../services/product-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ListProductComponent {
  products: any[];
  constructor(private productService: ProductService, private productState: ProductStateService, private router: Router){}

  ngOnInit() {

      this.listProducts();

  }

  listProducts(){
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  goToEdit(product: Product){
    this.productState.setProduct(product);
    this.router.navigate(['/edit'])
  }
  
}
