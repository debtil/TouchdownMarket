import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {ngSkipHydration: 'true'},
})
export class AppComponent {
  title = 'TouchdownMarket2.0';
  hidden: boolean = false;
  toDisplay = false;

  private _router = inject(Router)

  constructor(private authService: AuthService) {
    let user = authService.userLogged();

    if(user) {
      console.log(user)
      this.hidden = true
    }else {
      console.log('conta')
      this.hidden = false
    }
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
  
  toggleData() {
    this.toDisplay = !this.toDisplay;
  }
  
  goToCreate(){
    this._router.navigate(['/create']);
  }

  goToLogin(){
    this._router.navigate(['/login']);
  }

  goToList(){
    this._router.navigate(['/list']);
  }

  toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
  }
}
