import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {ActionCodeSettings, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, 
  sendSignInLinkToEmail, signInWithEmailAndPassword, signOut, updateEmail, updateProfile} from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  createAuth(){
    this.auth = getAuth()
  }

  createStore(name: string, email: string, password: string){
    this.createAuth();
    return createUserWithEmailAndPassword(this.auth, email, password).then(() =>{
      this.createAuth();
      let user = this.auth.currentUser;
      updateProfile(user, {displayName: name}).then(() =>{
        alert('Loja cadastrada!');
        console.log(user)
      });
    });
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

  updateUser(newName:string, newEmail:string){
    this.createAuth();
    let user = this.auth.currentUser;
    updateProfile(user, {displayName: newName}).then(() =>{
      updateEmail(user, newEmail);
      alert("Email trocado com sucesso!");
    }).catch((error) =>{
      alert("Erro ao atualizar as informações!");
      console.log(error);
    })
  }

  passwordReset(email:string){
    this.createAuth();
    sendPasswordResetEmail(this.auth, email).then(() =>{
      alert('Email para troca de senha enviado para' + ' ' + email);
    }).catch(() =>{
      alert('Email não válido!');
    })
  }
}
