import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TouchdownMarket2.0';

  private _router = inject(Router)
  
  goToCreate(){
    this._router.navigate(['/create']);
  }
}
