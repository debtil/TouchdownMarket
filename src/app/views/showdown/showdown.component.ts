import { Component, NgZone, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductStateService } from '../../services/product-state.service';
import { Observable, map } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-showdown',
  templateUrl: './showdown.component.html',
  styleUrl: './showdown.component.css'
})
export class ShowdownComponent {
  products: any[];
  searchForm: FormGroup;

  constructor(private router: Router, 
    private productService: ProductService, 
    private productStateService: ProductStateService, 
    private formBuilder: FormBuilder, 
    private ngZone: NgZone){}

    cartService = inject(CartService);

  ngOnInit(){
    this.ngZone.run(() =>{
      this.listProducts();
    });
    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  listProducts(){
    this.productService.getProducts().subscribe((res) =>{
      this.products = res;
    })
  }

  private filterProducts(searchValue: string): Observable<Product[]>{
    return this.productService.getProducts().pipe(
      map((products) =>{
        return products.filter((product) =>{
          const matchesSearch = product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
          return matchesSearch;
        });
      })
    );
  }

  submitForm(){
    const searchValue = this.searchForm.controls['name'].value;
    this.filterProducts(searchValue).subscribe((filteredProducts) =>{
      this.ngZone.run(() =>{
        this.products = filteredProducts;
      });
    });
  }

  goToProduct(product: Product){
    this.productStateService.setProduct(product);
    this.router.navigate(['/product']);
  }

  addToCart(product: Product){
    this.cartService.addToCart(product)
  }
}
