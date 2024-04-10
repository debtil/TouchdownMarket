import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmited: boolean = false;
  hidden: boolean = false;

  constructor(private ngZone: NgZone, private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  submitForm(): boolean{
    this.isSubmited = true
    if(!this.loginForm.valid) {
      this.isSubmited = false;
      this.loginForm.reset();
      alert("Todos os campos são obrigatórios!")
      return false
    }
    console.log(this.loginForm.value)
    this.login();
    return true
  }

  login(){
    this.isSubmited = true;
    let acc = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.auth
      .login(acc.email, acc.password)
      .then((loggedIn) => {
        if (loggedIn) {
          alert('Login realizado com sucesso!');
          this.ngZone.run(() => this.router.navigate(['/list']));
        } else {
          this.loginForm.reset();
          alert('Credenciais incorretas ou usuário não cadastrado!');
        }
      })
      .catch((error) => {
        console.error(error); // Trate erros de autenticação aqui
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
