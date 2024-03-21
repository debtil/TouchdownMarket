import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service'
import {StoreService} from '../../services/store.service'

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.css'
})
export class AddStoreComponent {
  addForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private storeService: StoreService){}

  ngOnInit(): void{
    this.addForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  private addStore(){
    this.authService.createStore(this.addForm.controls['name'].value, this.addForm.controls['email'].value, this.addForm.controls['password'].value).then((userCredential) =>{
      alert("Loja criada com sucesso")
      const user = userCredential;
      console.log(user)
      this.router.navigate(['list']);
    }).catch((error) =>{
      alert("Erro ao criar a loja!");
      console.log(error);
    })
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.addForm.valid){
      alert('Todos os campos são obrigatórios');
      return false;
    }
    this.addStore();
    return true;
  }

  disconnect(){
    this.authService.logout().then(()=>{
      alert('Conta desconectada');
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.log(error);
    })
  }
}
