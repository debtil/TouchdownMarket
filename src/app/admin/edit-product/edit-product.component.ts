import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductStateService } from '../../services/product-state.service';
import { Router } from '@angular/router';
import { ProductCategory } from '../../utils/product-category.enum';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  host: {ngSkipHydration: 'true'},
})
export class EditProductComponent {
  product: Product;
  data: string;
  editForm: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;
  ProductCategory = ProductCategory;
  categoryKeys: string[];

  products: Product[];

  constructor(private router: Router, private productService: ProductService, private productState: ProductStateService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.categoryKeys = Object.keys(ProductCategory);

    this.productState.product$.subscribe(product => {
      this.product = product;
      this.initializeForm();
    });
  }

  initializeForm() {
    this.editForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      category: [this.product.category, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      price: [this.product.price, [Validators.required, Validators.min(1)]],
      quantity: [this.product.quantity, [Validators.required, Validators.min(1)]],
      sizes: this.formBuilder.array(this.product.sizes ? this.product.sizes.map(size => this.formBuilder.control(size, Validators.required)) : []),
      images: ['']
    });
  }

  get sizes(){
    return this.editForm.get('sizes') as FormArray;
  }

  addSize(size: string = ''){
    this.sizes.push(this.formBuilder.control(size, Validators.required));
  }

  removeSize(i: number){
    this.sizes.removeAt(i);
  }

  updateFile(file: any){
    this.imagem = file
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.editForm.valid){
      alert("Todos os campos são obrigatórios!");
      return false;
    }else{
      this.edit();
      return true;
    }
  }

  edit(){
    if(this.editForm.value.images != ""){
      this.productService.updateWithImg(this.imagem, this.editForm.value, this.product.id);
      this.router.navigate(["/list"]);
    }else{
      this.productService.updateWithoutImg(this.editForm.value, this.product.id)
      this.router.navigate(["/list"]);
    }
  }

  delete(){
    let confirmation = confirm("Deseja mesmo apagar este produto?");
    if(confirmation){
      this.deleteProduct();
    }
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product.id).then(() => {
      this.router.navigate(['/list'])
    }).catch((error) => {
      alert('erro ao apagar')
      console.log(error)
    })
  }

  getCategoryValue(key: string): string {
    return this.ProductCategory[key as keyof typeof this.ProductCategory];
  }
}
