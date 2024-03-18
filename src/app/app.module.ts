import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'


import { AddProductComponent } from './admin/add-product/add-product.component';
import { ListProductComponent } from './admin/list-product/list-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ShowdownComponent } from './views/showdown/showdown.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    ShowdownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    provideClientHydration(),
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
