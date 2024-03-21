import { Injectable, inject } from '@angular/core';
import {Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc} from '@angular/fire/firestore';
import {Store} from '../models/store.model'
import { Observable } from 'rxjs';

const PATH = 'stores'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _firestore = inject(Firestore)
  private _collection = collection(this._firestore, PATH);

  constructor() { }

  createStore(store: Store){
    return addDoc(this._collection, store).then(() =>{
      console.log('Store added to Firestore');
    }).catch((error) =>{
      console.log('Error adding store to Firestore:' + error);
      throw error;
    })
  }

  getStores(){
    return collectionData(this._collection, {idField: 'id'}) as Observable<Store[]>;
  }

  async getStore(id: string){
    try {
      const document = doc(this._firestore, PATH, id);
      const snapshot = await getDoc(document);
      return snapshot.data() as Store;
    } catch (error) {
      return undefined;
    }
  }

  deleteStore(id:string){
    const document = doc(this._firestore, PATH, id);
    return deleteDoc(document);
  }
}
