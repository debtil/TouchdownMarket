import { Component, NgZone } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductStateService } from '../../services/product-state.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from '../../utils/product-category.enum';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ListProductComponent {
  products: any[];
  searchForm: FormGroup;
  productCat = ProductCategory;
  categoryKeys: string[];
  ProductCategory = ProductCategory;

  constructor(private productService: ProductService, private productState: ProductStateService, private router: Router, private formBuilder: FormBuilder, private ngZone: NgZone){}

  ngOnInit() {
    this.categoryKeys = Object.keys(ProductCategory);
    this.listProducts();

    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]]
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

  private filterProducts(searchValue: string, categoryValue: string): Observable<Product[]>{
    return this.productService.getProducts().pipe(
      map((products) =>{
        return products.filter((product) =>{
          const matchesSearch = product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
          const matchesCategory = !categoryValue || product.category === categoryValue;
          return matchesSearch && matchesCategory;
        });
      })
    );
  }
  
  submitForm(){
    const searchValue = this.searchForm.controls['name'].value;
    const categoryValue = this.searchForm.controls['category'].value;
    this.filterProducts(searchValue, categoryValue).subscribe((filteredProducts) =>{
      this.ngZone.run(() =>{
        this.products = filteredProducts;
      });
    });
  }

  getCategoryDisplayName(category: string): string {
    return this.getCategoryValue(category);
  }

  getCategoryValue(key: string): string {
    return this.ProductCategory[key as keyof typeof this.ProductCategory];
  }

  productCategory(category: string) {
    return ProductCategory[category as keyof typeof ProductCategory];
  }
}
