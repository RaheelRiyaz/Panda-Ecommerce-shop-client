import { PaymentMethod } from '../enums/enum';

export class OrderResponse {
  productId!: string;
  sizeId!: string;
  size!: number;
  createdOn!: Date;
  quantity!: number;
  orderStatus!: number;
  paymentMethod!: number;
  productName!: string;
  brandName!: string;
  customerName!: string;
  street!: string;
  country!: string;
  state!: string;
  landmark!: string;
  contactNo!: string;
  fullName!: string;
  houseNo!: string;
  city!: string;
  subTotal!: number;
  pincode!: number;
  id!: string;
}

export class GenerateOrderRequest {
  productId!: string;
  // addressId!: string;
  sizeId?: string;
  quantity!: number;
}

export class OrderSummary {
  fullName!: string;
  houseNo!: string;
  orderId!: string;
  city!: string;
  country!: string;
  state!: string;
  productName!: string;
  price!: string;
  COD!: boolean;
  subTotal!: number;
  street!: string;
  pincode!: number;
  quantity!: number;
  landMark!: string;
  description!: string;
  productId!: string;
  addressId!: string;
}
