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
  title = 'TouchdownMarket';
  

  private _router = inject(Router)
  
  goToCreate(){
    this._router.navigate(['/create']);
  }

  goToList(){
    this._router.navigate(['/list']);
  }

  goToLogin(){
    this._router.navigate(['/login']);
  }

  toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
  }
}
