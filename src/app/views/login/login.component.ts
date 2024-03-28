import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;
  isSubmitted: boolean = false
  hidden: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    let user = this.authService.userLogged();
    if(user !== null) {
      console.log(user)
      this.hidden = false
    }else {
      console.log('conta')
      this.hidden = true
    }
    console.log(this.hidden)
  }

  submitForm(): boolean{
    this.isSubmitted = true
    if(!this.formLogin.valid) {
      this.isSubmitted = false;
      this.formLogin.reset();
      alert("Todos os campos são obrigatórios!")
      return false
    }
    console.log(this.formLogin.value)
    this.login();
    return true
  }

  private login(){
    this.authService.login( this.formLogin.controls['email'].value, this.formLogin.controls['senha'].value).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Login realizado com sucesso!");
      this.router.navigate(['/profile']);
    }).catch((error) => {
      alert(error)
    })
  }

  disconnect() {
    this.authService.logout()
    .then(() => {
      alert("usuário desconectado!")
      this.goToLogin()
    }).catch((error) => {
      alert(error)
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
