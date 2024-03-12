import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  data: string;
  addForm: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;

  constructor( private router: Router,  private productService: ProductService, private formBuilder: FormBuilder, /*private auth: AuthService*/) {}

  ngOnInit(){
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      price: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]], 
      image: ['', Validators.required],
    });
    this.data = new Date().toISOString();
  }

  private addProduct(){
    const product = this.addForm.value;
    this.productService.createProduct(product).then(() => {
      alert('Criado com sucesso')
    }).catch((error) => {
      alert('erro')
      console.log(error)
    })
  }

  submitForm(): boolean{
    this.isSubmitted = true;
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
