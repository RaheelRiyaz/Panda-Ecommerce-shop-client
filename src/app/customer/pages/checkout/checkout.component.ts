import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../services/base.service';
import { OrderResponse, OrderSummary } from '../../../models/order';
import { AddressResponse } from '../../../models/address';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BaseService
  ) {}
  orderDetails!: OrderSummary;
  orderId!: string;
  showAddresses: boolean = false;
  addresses: AddressResponse[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.orderId = response['id'];
      },
    });
    this.getAllAddresses();
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.service
      .Find<OrderSummary>(`orders/order-summary/${this.orderId}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.orderDetails = response.result;
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  getAllAddresses(): void {
    this.service.Fetch<AddressResponse[]>('addresses/all-addresses').subscribe({
      next: (response) => {
        this.addresses = response.result;
        console.log(response);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

 
}
