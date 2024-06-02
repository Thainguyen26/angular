import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateComponent } from './pages/admin/products/create/create.component';
import { EditComponent } from './pages/admin/products/edit/edit.component';
import { RegiterComponent } from './pages/regiter/regiter.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/create',
        component: CreateComponent,
      },
      {
        path: 'products/edit/:id',
        component: EditComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products/detail/:id',
    component: DetailComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegiterComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
