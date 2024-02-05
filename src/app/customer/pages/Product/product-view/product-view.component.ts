import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  ProductItemResponse,
  ProductResponse,
  SimilarProductRequest,
} from '../../../../models/product';
import { environment } from '../../../../environment/environment';
import { SharedService } from '../../../../services/shared.service';
import { CartRequest } from '../../../../models/cart';
import { filter } from 'rxjs';
import { GenerateOrderRequest, OrderResponse } from '../../../../models/order';
import { PaymentMethod } from '../../../../enums/enum';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {}

  productId!: string;
  @ViewChildren('btns') btns!: QueryList<ElementRef>;
  sizeId!: string;
  url!: string;
  quantity: number = 1;
  isProductInCart: boolean = false;
  baseUrl: string = environment.imageBasePath;
  product!: ProductResponse;
  similarProducts!: ProductItemResponse[];
  src: string = '';

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
        this.getProductdetails();
        this.getSimilarProducts();
      });

    this.activatedRoute.params.subscribe({
      next: (response) => (this.productId = response['productid']),
    });

    this.getProductdetails();
    this.url = this.router.url.slice(0, this.router.url.lastIndexOf('/'));
  }

  getProductdetails(): void {
    this.service.Find<ProductResponse>(`products/${this.productId}`).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.product = response.result;
          this.checkProductInCart(response.result.id);
          this.getSimilarProducts();
        }
      },
      error: (err: Error) => {},
    });
  }

  checkProductInCart(id: string): void {
    this.service.Find<boolean>(`carts/checkproductincart/${id}`).subscribe({
      next: (response) => {
        this.isProductInCart = response.result;
      },
      error: (err: Error) => {},
    });
  }

  addToCart(id: string): void {
    if (!this.sizeId) this.sizeId = this.btns?.first?.nativeElement?.id;
    const cartRequest: CartRequest = new CartRequest();
    cartRequest.productId = id;
    cartRequest.quantity = this.quantity;
    cartRequest.sizeId = this.sizeId;
    this.service
      .Post<CartRequest, CartRequest>(cartRequest, 'carts')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.sharedService.cartEventEmitter.emit('Item Added to Cart');
            this.checkProductInCart(this.product.id);
          } else environment.fireSwal(response.message, 'error');
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, 'error');
        },
      });
  }

  selectSize(sizeId: string, i: number) {
    this.sizeId = sizeId;
    document.querySelector('.active-size')?.classList.remove('active-size');
    this.btns.get(i)?.nativeElement.classList.add('active-size');
  }

  removeToCart(id: string): void {
    this.service.Delete<string>(`carts/${id}`).subscribe({
      next: (response) => {
        if (response.isSuccess)
          this.sharedService.cartEventEmitter.emit('Item removed from Cart');
        this.checkProductInCart(this.product.id);
      },
    });
  }

  toggleImage(soruce: string, target: HTMLImageElement) {
    target.src = soruce;
  }

  getSimilarProducts(): void {
    const similarProductRequest = new SimilarProductRequest(
      this.product.id,
      this.product.subCategoryId
    );
    this.service
      .Post<SimilarProductRequest, ProductItemResponse[]>(
        similarProductRequest,
        'products/similar-products'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.similarProducts = response.result;
        },
        error: (err: Error) => {},
      });
  }

  generateOrder(): void {
    // this.router.navigate(['/customer/checkout'])
    if (!this.sizeId) this.sizeId = this.btns?.first?.nativeElement?.id;
    const orderRequest: GenerateOrderRequest = new GenerateOrderRequest();
    orderRequest.quantity = this.quantity;
    orderRequest.sizeId = this.sizeId;
    orderRequest.productId = this.productId;
    // orderRequest.addressId = '';
    console.log(orderRequest);
    this.service
      .Post<GenerateOrderRequest, OrderResponse>(
        orderRequest,
        'orders/generate-order'
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess)
            this.router.navigate([`/customer/checkout/${response.result.id}`]);
          else environment.fireSwal(response.message, 'error');
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
  getSrc(src: string): void {
    this.src = src;
  }
}
