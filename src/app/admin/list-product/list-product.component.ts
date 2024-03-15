import { Component, NgZone } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductStateService } from '../../services/product-state.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ListProductComponent {
  products: any[];
  searchForm: FormGroup;

  constructor(private productService: ProductService, private productState: ProductStateService, private router: Router, private formBuilder: FormBuilder, private ngZone: NgZone){}

  ngOnInit() {

    this.listProducts();

    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
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

  private filterProducts(searchValue: string): Observable<Product[]> {
    return this.productService.getProducts().pipe(
      map((products) => {
        return products.filter((product) => {
          const matchesSearch = product.name.toLowerCase().includes(searchValue.toLowerCase());
          return matchesSearch;
        });
      })
    );
  }
  
  submitForm(){
    const searchValue = this.searchForm.controls['name'].value;
    this.filterProducts(searchValue).subscribe((filteredProducts) => {
      this.ngZone.run(() => {
        this.products = filteredProducts;
      });
    });
  }
}
