import { Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from '../components/pages/login/login.component';
import { CategoryListComponent } from '../components/pages/category/category-list/category-list.component';
import { UserListComponent } from '../components/pages/user/user-list/user-list.component';
import { UserProfileComponent } from '../components/pages/user/user-profile/user-profile.component';
import { ProductCategoryListComponent } from '../components/pages/product-category/product-category-list/product-category-list.component';
import { ProductListComponent } from '../components/pages/product/product-list/product-list.component';
import { InputListComponent } from '../components/pages/input/input-list/input-list.component';
import { OutputListComponent } from '../components/pages/output/output-list/output-list.component';
import { ProductInputListComponent } from '../components/pages/product-input/product-input-list/product-input-list.component';
import { ProductOutputListComponent } from '../components/pages/product-output/product-output-list/product-output-list.component';

export const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'users/list',
      component: UserListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'users/profile',
      component: UserProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'categories/list',
      component: CategoryListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'products/:product/categories/list',
      component: ProductCategoryListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'products/list',
      component: ProductListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'inputs/list',
      component: InputListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'products/:product/inputs/list',
      component: ProductInputListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'products/:product/outputs/list',
      component: ProductOutputListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'outputs/list',
      component: OutputListComponent,
      canActivate: [AuthGuard]
    },
    // Rota padrão
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
];
