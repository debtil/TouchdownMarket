import { Injectable, inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import {Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc} from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const PATH = 'products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _firestore = inject(Firestore);
  private _storage = inject(AngularFireStorage)
  private _collection = collection(this._firestore, PATH);

  constructor(private angularFirestore: AngularFirestore){}
  getProducts(){
    return collectionData(this._collection, {idField: 'id'}) as Observable<Product[]>
  }

  createProduct(product: Product){
    return addDoc(this._collection, product).then(() => {
      console.log('Product added to Firestore');
    }).catch((error) => {
      console.log('Error adding product to Firestore:', error);
      throw error;
    });
  }

  updateProduct(id:string, product: Product){
    const document = doc(this._firestore, PATH, id);
    return updateDoc(document, {...product});
  }

  async getProduct(id:string){
    try {
      const document = doc(this._firestore, PATH, id);
      const snapshot = await getDoc(document);
      return snapshot.data() as Product; 
    } catch (error) {
      return undefined;
    }
  }

  deleteProduct(id:string){
    const document = doc(this._firestore, PATH, id);
    return deleteDoc(document);
  }

  createWithImg(imagem: any, product: Product){
    const file = imagem.item(0);
    if(file.type.split('/')[0] != 'image'){
      alert('erro')
      return console.log('erro');
    }

    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this._storage.ref(path);
    let task = this._storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        console.log(fileRef);
        let uploadedFile = fileRef.getDownloadURL();
        uploadedFile.subscribe(resp =>{
          product.images = resp;
          this.createProduct(product);
        })
      })
    ).subscribe();
    return task;
  }

  /*updateWithImg(images:any, product: Product, id: string){
    const file = images.item(0);
    if(file.type.split('/')[0] != 'image'){
      alert('tipo não suportado')
      return console.log('erro');
    }
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this._storage.ref(path);
    let task = this._storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        console.log(fileRef);
        let uploadedFile = fileRef.getDownloadURL();
        uploadedFile.subscribe(resp =>{
          product.images = resp;
          this.updateProduct(id, product);
        })
      })
    ).subscribe();
    return task;
  }*/

  updateWithoutImg(product: Product, id: string){
    return this.angularFirestore.collection(PATH).doc(id).update({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      sizes: product.sizes
    })
  }
}
