import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {MatExpansionModule} from '@angular/material/expansion';


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
import { LoginComponent } from './views/login/login.component';
import { ProductPageComponent } from './views/product-page/product-page.component';
import { CartComponent } from './views/cart/cart.component';
import { HomeComponent } from './views/home/home.component';
import { OrdersComponent } from './views/orders/orders.component';

import {ButtonModule} from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { PaymentStatusPipe } from './utils/payment-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    ShowdownComponent,
    LoginComponent,
    ProductPageComponent,
    CartComponent,
    HomeComponent,
    OrdersComponent,
    PaymentStatusPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    CarouselModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    MatExpansionModule,
    FileUploadModule,
    InputNumberModule,
    ReactiveFormsModule,
    MatSnackBarModule,
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
