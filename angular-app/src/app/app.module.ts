import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Select2Module } from 'ng2-select2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from './components/pages/category/category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from './components/pages/category/category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from './components/pages/category/category-delete-modal/category-delete-modal.component';
import { ProductNewModalComponent } from './components/pages/product/product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from './components/pages/product/product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './components/pages/product/product-delete-modal/product-delete-modal.component';
import { ProductRestoreModalComponent } from './components/pages/product/product-restore-modal/product-restore-modal.component';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { NumberFormatBrPipe } from './pipes/number-format-br.pipe';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
// tslint:disable-next-line:max-line-length
import { ProductCategoryLinkModalComponent } from './components/pages/product-category/product-category-link-modal/product-category-link-modal.component';
// tslint:disable-next-line:max-line-length
import { ProductCategoryDeleteModalComponent } from './components/pages/product-category/product-category-delete-modal/product-category-delete-modal.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserNewModalComponent } from './components/pages/user/user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from './components/pages/user/user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './components/pages/user/user-delete-modal/user-delete-modal.component';
import { UserRestoreModalComponent } from './components/pages/user/user-restore-modal/user-restore-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarComponent } from './components/bootstrap/navbar/navbar.component';
import { RefreshTokenInterceptorService } from 'src/app/services/refresh-token-interceptor.service';

import { environment } from '../environments/environment';
import { SortColumnComponent } from './components/common/sort-column/sort-column.component';
import { SearchFormComponent } from './components/common/search-form/search-form.component';
import { CategoryFormComponent } from './components/pages/category/category-form/category-form.component';
import { ProductFormComponent } from './components/pages/product/product-form/product-form.component';
import { UserFormComponent } from './components/pages/user/user-form/user-form.component';
import { FieldErrorComponent } from './components/bootstrap/field-error/field-error.component';
import { IsInvalidDirective, IsInvalidControlDirective } from './directives/is-invalid.directive';
import { ListErrorComponent } from './components/bootstrap/list-error/list-error.component';
import { CardErrorComponent } from './components/bootstrap/card-error/card-error.component';
import { InputListComponent } from './components/pages/input/input-list/input-list.component';
import { OutputListComponent } from './components/pages/output/output-list/output-list.component';
import { UserProfileComponent } from './components/pages/user/user-profile/user-profile.component';
import { ProductInputListComponent } from './components/pages/product-input/product-input-list/product-input-list.component';
import { ProductOutputListComponent } from './components/pages/product-output/product-output-list/product-output-list.component';
import { ProductInputNewModalComponent } from './components/pages/product-input/product-input-new-modal/product-input-new-modal.component';
import { ProductPhotosListComponent } from './components/pages/product-photos/product-photos-list/product-photos-list.component';
import { ProductPhotosUploadComponent } from './components/pages/product-photos/product-photos-upload/product-photos-upload.component';
import { ProductPhotosEditModalComponent } from './components/pages/product-photos/product-photos-edit-modal/product-photos-edit-modal.component';
import { ProductPhotosDeleteModalComponent } from './components/pages/product-photos/product-photos-delete-modal/product-photos-delete-modal.component';

function jwtFactory(authService: AuthService) {
  return {
    whitelistedDomains: [
      new RegExp(`${environment.api.host}/*`)
    ],
    tokenGetter: () => {
      return authService.getToken();
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    AlertErrorComponent,
    ModalComponent,
    CategoryNewModalComponent,
    CategoryEditModalComponent,
    CategoryDeleteModalComponent,
    ProductNewModalComponent,
    ProductEditModalComponent,
    ProductDeleteModalComponent,
    ProductRestoreModalComponent,
    ProductListComponent,
    NumberFormatBrPipe,
    ProductCategoryListComponent,
    ProductCategoryLinkModalComponent,
    ProductCategoryDeleteModalComponent,
    UserListComponent,
    UserNewModalComponent,
    UserEditModalComponent,
    UserDeleteModalComponent,
    UserRestoreModalComponent,
    NavbarComponent,
    SortColumnComponent,
    SearchFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    UserFormComponent,
    FieldErrorComponent,
    IsInvalidDirective,
    IsInvalidControlDirective,
    ListErrorComponent,
    CardErrorComponent,
    InputListComponent,
    OutputListComponent,
    UserProfileComponent,
    ProductInputListComponent,
    ProductOutputListComponent,
    ProductInputNewModalComponent,
    ProductPhotosListComponent,
    ProductPhotosUploadComponent,
    ProductPhotosEditModalComponent,
    ProductPhotosDeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthService]
      }
    }),
    Select2Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
