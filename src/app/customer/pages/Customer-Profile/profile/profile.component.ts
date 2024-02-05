import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { OrderResponse } from '../../../../models/order';
import { UserDetails } from '../../../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  // constructor(private service: BaseService) {}
  // cartItems: number = 0;
  // myOrders: OrderResponse[] = [];
  // userDetails: UserDetails = new UserDetails();
  // ngOnInit(): void {
  //   this.getMyCartItems();
  //   this.getMyOrders();
  //   this.getMyDetails();
  // }

  // private getMyCartItems(): void {
  //   this.service.Fetch<number>('carts/mycart-length').subscribe({
  //     next: (response) => {
  //       if (response.isSuccess) this.cartItems = response.result;
  //     },
  //     error: (err: Error) => {},
  //   });
  // }

  // private getMyOrders(): void {
  //   this.service.Fetch<OrderResponse[]>('orders/customer').subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this.myOrders = response.result;
  //     },
  //     error: (err: Error) => {},
  //   });
  // }

  // private getMyDetails(): void {
  //   this.service.Find<UserDetails>('auth/details').subscribe({
  //     next: (response) => {
  //       this.userDetails = response.result;
  //     },
  //     error: (err: Error) => {},
  //   });
  // }
}
