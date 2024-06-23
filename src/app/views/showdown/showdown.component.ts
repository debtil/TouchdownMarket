import { Component, Inject, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductStateService } from '../../services/product-state.service';
import { Observable, map } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductCategory } from '../../utils/product-category.enum';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-showdown',
  templateUrl: './showdown.component.html',
  styleUrl: './showdown.component.css'
})
export class ShowdownComponent {
  products: Product[];
  searchForm: FormGroup;
  productCat = ProductCategory;
  categoryKeys: string[];
  ProductCategory = ProductCategory;
  categoryOptions: SelectItem[];

  constructor(private router: Router, 
    private productService: ProductService, 
    private productStateService: ProductStateService, 
    private formBuilder: FormBuilder, 
    private ngZone: NgZone,
    @Inject(CartService) private cartService: CartService){}

  ngOnInit(){
    this.categoryKeys = Object.keys(ProductCategory);
    this.categoryOptions = [{ label: 'Todas as categorias', value: '' }, ...this.categoryKeys.map(key => ({ label: this.getCategoryValue(key), value: key }))];
    this.ngZone.run(() =>{
      this.listProducts();
    });
    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  listProducts(){
    this.productService.getProducts().subscribe((res) =>{
      this.products = res;
    })
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

  productCategory(category: string) {
    return ProductCategory[category as keyof typeof ProductCategory];
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

  goToProduct(product: Product){
    this.productStateService.setProduct(product);
    this.router.navigate(['/product']);
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
      sizes: product.sizes
    })
  }

  getCategoryDisplayName(category: string): string {
    return this.getCategoryValue(category);
  }

  getCategoryValue(key: string): string {
    return this.ProductCategory[key as keyof typeof this.ProductCategory];
  }
}
