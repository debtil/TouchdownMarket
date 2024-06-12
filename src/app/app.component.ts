import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {ngSkipHydration: 'true'},
})
export class AppComponent {
  title = 'TouchdownMarket';
  isLoggedIn = false;
  isMobileMenuOpen: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(private auth: AuthService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  

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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(){
    this.auth.logout();
    this._router.navigate(["/login"])
  }
}
