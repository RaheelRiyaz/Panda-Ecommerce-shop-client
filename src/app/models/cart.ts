export class CartRequest {
  productId!: string;
  quantity!: number;
  sizeId!: string;
}

export class CartResponse {
  subTotal!: number;
  cartItems: CartItem[] = [];
}

export class CartItem {
  id!: string;
  brandName!: string;
  description!: string;
  sizeId!: string;
  filePath!: string;
  productId!: string;
  quantity!: number;
  size!: string;
  total!: number;
  productPrice!: number;
}

export class CartUpdateRequest {
  constructor(private productId: string, private quantity: number) {}
}
