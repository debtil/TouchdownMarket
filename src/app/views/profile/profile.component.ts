import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  formProfile: FormGroup;
  data: string;
  isSubmitted: boolean = false;
  edit: boolean = true;
  store: any;
  name: any;
  account: any;
  hidden: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.account = this.authService.userLogged();

    if(this.account) {
      this.formProfile = this.formBuilder.group({
        name: [this.account.name, [Validators.required]],
        email: [this.account.email, [Validators.required]],
      })
    }else {
      this.router.navigate(['/login']);
    }

    let user = this.authService.userLogged();
      if(user !== null) {
        console.log(user)
        this.hidden = true
      }else {
        console.log('conta')
        this.hidden = false
      }
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.formProfile.valid){
      this.isSubmitted = false;
      this.formProfile.reset();
      alert("Todos os campos são Obrigatórios!");
      return false;
    }
      this.update();
      return true;
  }

  private update(){
    this.authService.updateUser(this.formProfile.controls['name'].value, this.formProfile.controls['email'].value);
  }

  turnOnEdit(){
    if(this.edit == true){
      this.edit = false;
    }else{
      this.edit = true;
    }
  }

  resetPassword(){
    this.authService.passwordReset(this.account.email);
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
