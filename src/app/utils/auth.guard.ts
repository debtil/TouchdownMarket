import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => !!user), // Converte user para um booleano
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
        }
      })
    );
  }
}