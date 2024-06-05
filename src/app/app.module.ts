import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

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
import { AddStoreComponent } from './adminMaster/add-store/add-store.component';
import { LoginComponent } from './views/login/login.component';
import { ProductPageComponent } from './views/product-page/product-page.component';
import { CartComponent } from './views/cart/cart.component';

import {
  LucideAngularModule,
  Plane,
  PlaneTakeoff,
  Twitch,
  Twitter,
  Facebook,
  GraduationCap,
  Menu,
  ArrowLeft,
  ArrowRight,
  Search,
} from 'lucide-angular';
import { HomeComponent } from './views/home/home.component';
import { OrdersComponent } from './views/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    ShowdownComponent,
    AddStoreComponent,
    LoginComponent,
    ProductPageComponent,
    CartComponent,
    HomeComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    LucideAngularModule.pick({
      Plane,
      PlaneTakeoff,
      Twitch,
      Twitter,
      Facebook,
      GraduationCap,
      Menu,
      ArrowLeft,
      ArrowRight,
      Search,
    }),
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
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [
    provideClientHydration(),
    HttpClientModule,
    provideNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
