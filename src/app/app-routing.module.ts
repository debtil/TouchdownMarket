import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ListProductComponent } from './admin/list-product/list-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import {AddStoreComponent} from './adminMaster/add-store/add-store.component'
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
