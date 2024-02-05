import { Component } from '@angular/core';
import { UserDetails } from '../../../../models/user';
import { OrderResponse } from '../../../../models/order';
import { BaseService } from '../../../../services/base.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  constructor(private service: BaseService) {}
  cartItems: number = 0;
  myOrders: OrderResponse[] = [];
  userDetails: UserDetails = new UserDetails();
  ngOnInit(): void {
    this.getMyCartItems();
    this.getMyOrders();
    this.getMyDetails();
  }

  private getMyCartItems(): void {
    this.service.Fetch<number>('carts/mycart-length').subscribe({
      next: (response) => {
        if (response.isSuccess) this.cartItems = response.result;
      },
      error: (err: Error) => {},
    });
  }

  private getMyOrders(): void {
    this.service.Fetch<OrderResponse[]>('orders/customer').subscribe({
      next: (response) => {
        console.log(response);
        this.myOrders = response.result;
      },
      error: (err: Error) => {},
    });
  }

  private getMyDetails(): void {
    this.service.Find<UserDetails>('auth/details').subscribe({
      next: (response) => {
        this.userDetails = response.result;
      },
      error: (err: Error) => {},
    });
  }
}
