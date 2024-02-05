import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { CartResponse, CartUpdateRequest } from '../../../models/cart';
import { environment } from '../../../environment/environment';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    private service: BaseService,
    private sharedService: SharedService
  ) {}
  cartItems: CartResponse = new CartResponse();
  baseUrl: string = environment.imageBasePath;
  ngOnInit(): void {
    this.getUserCartItems();
  }

  getUserCartItems(): void {
    this.service.Fetch<CartResponse>('carts').subscribe({
      next: (response) => {
        console.log(response.result);
        
        if (response.isSuccess) this.cartItems = response.result;
        else this.cartItems = new CartResponse();
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  removeFromCart(id: string): void {
    this.service.Delete<string>(`carts/${id}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sharedService.cartEventEmitter.emit('Item removed from Cart');
          this.getUserCartItems();
        }
      },
    });
  }

  updateCart(quantity: string, productId: string): void {
    if (+quantity > 0) {
      const cartUpdateRequest: CartUpdateRequest = new CartUpdateRequest(
        productId,
        +quantity
      );
      this.service
        .Update<CartUpdateRequest, string>(cartUpdateRequest, 'carts')
        .subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.sharedService.cartEventEmitter.emit(
                'Cart Updated Successfully'
              );
              this.getUserCartItems();
            }
          },
          error:(err:Error)=>{
            
          }
        });
    }
  }
}
