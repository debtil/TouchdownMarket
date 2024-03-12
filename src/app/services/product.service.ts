import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from '@angular/fire/firestore';
import { Product } from '../models/product.model';

const PATH = 'products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

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

  async searchProductByQuery(productName: string){
    const q = query(this._collection, where('name', '>=', productName), where('name', '<=', productName + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    let products: Product[] = [];

    querySnapshot.forEach((doc) =>{
      products = [...products, {id: doc.id, ...doc.data()} as Product]
    });
    return products;
  }
}
