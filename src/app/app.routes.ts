import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';

export const routes: Routes = [
    {path:'',loadChildren:()=>UserModule},
    {path:'customer',loadChildren:()=>CustomerModule},
];
