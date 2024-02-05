import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/Product/products/products.component';
import { ProfileComponent } from './pages/Customer-Profile/profile/profile.component';
import { AllProductsComponent } from './pages/Product/all-products/all-products.component';
import { SubProductsComponent } from './pages/Product/sub-products/sub-products.component';
import { ProductViewComponent } from './pages/Product/product-view/product-view.component';
import { AddressesComponent } from './pages/Customer-Profile/addresses/addresses.component';
import { AccountComponent } from './pages/Customer-Profile/account/account.component';
import { OrdersComponent } from './pages/Customer-Profile/orders/orders.component';
import { AddAddressComponent } from './pages/Customer-Profile/add-address/add-address.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout/:id', component: CheckoutComponent },
      {
        path: 'products/:id',
        component: ProductsComponent,
        children: [
          { path: '', component: AllProductsComponent },
          {
            path: 'subcategories/:subcategoryid',
            component: SubProductsComponent,
          },
          { path: 'viewproduct/:productid', component: ProductViewComponent },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'orders', component: OrdersComponent },
          { path: '', redirectTo: 'orders', pathMatch: 'full' },
          { path: 'address', component: AddressesComponent },
          { path: 'account', component: AccountComponent },
          { path: 'add_address', component: AddAddressComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
