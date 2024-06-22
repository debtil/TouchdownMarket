import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: any;

  constructor() { }

  createAuth(){
    this.auth = getAuth()
  }

  login(email:string, password:string){
    this.createAuth();
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    this.createAuth();
    return signOut(this.auth);
  }

  userLogged(){
    this.createAuth();

    let user = this.auth.currentUser;
    let name = "", email = "", password = "";

    if(user !== null){
      user.providerData.forEach((profile:any) => {
        name = profile.displayName;
        email = profile.email;
        password = profile.password;
      });
    }
    let account = {user: user, email: email, password: password}
    return account;
  }
}
