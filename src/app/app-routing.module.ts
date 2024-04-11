import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ListProductComponent } from './admin/list-product/list-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import {AddStoreComponent} from './adminMaster/add-store/add-store.component'
import { LoginComponent } from './views/login/login.component';
import { ShowdownComponent } from './views/showdown/showdown.component';
import {ProductPageComponent} from './views/product-page/product-page.component';
const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'create',
    component: AddProductComponent,
  },
  {
    path: 'list',
    component: ListProductComponent,
  },
  {
    path: 'edit',
    component: EditProductComponent,
  },
  {
    path: 'admin/create-store',
    component: AddStoreComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'showdown',
    component: ShowdownComponent,
  },
  {
    path: 'product',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
