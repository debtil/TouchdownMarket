import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  host: {ngSkipHydration: 'true'},
})
export class AddProductComponent {
  data: string;
  addForm: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;
  event: any;

  constructor( private router: Router,  private productService: ProductService, private formBuilder: FormBuilder, /*private auth: AuthService*/) {}

  ngOnInit(){
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]], 
      images: ['', Validators.required],
    });
    this.data = new Date().toISOString();
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  private addProduct(){
    const product: Product = this.addForm.value;
    this.productService.createWithImg(this.imagem, product)
    console.log(product);
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    console.log(this.addForm.value)
    if (!this.addForm.valid) {
      alert('Todos os campos são obrigatórios!');
      return false;
    } else {
      this.addProduct();
      this.addForm.reset();
      return true;
    }
  }
}
