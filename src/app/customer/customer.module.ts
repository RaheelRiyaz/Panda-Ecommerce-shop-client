import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/Product/products/products.component';
import { ProfileComponent } from './pages/Customer-Profile/profile/profile.component';
import { BaseService } from '../services/base.service';
import { ProductViewComponent } from './pages/Product/product-view/product-view.component';
import { AllProductsComponent } from './pages/Product/all-products/all-products.component';
import { SubProductsComponent } from './pages/Product/sub-products/sub-products.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrdersComponent } from './pages/Customer-Profile/orders/orders.component';
import { AddressesComponent } from './pages/Customer-Profile/addresses/addresses.component';
import { AccountComponent } from './pages/Customer-Profile/account/account.component';
import { AddAddressComponent } from './pages/Customer-Profile/add-address/add-address.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CustomerComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    ProfileComponent,
    ProductViewComponent,
    AllProductsComponent,
    SubProductsComponent,
    OrdersComponent,
    AddressesComponent,
    AccountComponent,
    AddAddressComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    BaseService,
    CurrencyPipe,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
})
export class CustomerModule {}
