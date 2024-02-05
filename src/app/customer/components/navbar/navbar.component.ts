import { Component, effect } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { CategoryResponse } from '../../../models/category';
import { SharedService } from '../../../services/shared.service';
import { environment } from '../../../environment/environment';
import { SuggestionResponse } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    protected service: BaseService,
    protected sharedService: SharedService,
    private router: Router
  ) {}
  categories: CategoryResponse[] = [];
  cartItems: number = 0;
  ngOnInit(): void {
    this.getMyCartItems();
    this.getCategories();
    this.sharedService.cartEventEmitter.subscribe({
      next: (response: string) => {
        environment.fireSwal(response);
        this.getMyCartItems();
      },
    });
  }

  emitProductChange(id: string): void {
    this.sharedService.productEventEmitter.emit(id);
  }

  getCategories(): void {
    this.service.Fetch<CategoryResponse[]>('categories').subscribe({
      next: (response) => {
        if (response.isSuccess) this.categories = response.result;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
  getMyCartItems(): void {
    this.service.Fetch<number>('carts/mycart-length').subscribe({
      next: (response) => {
        if (response.isSuccess) this.cartItems = response.result;
      },
      error: (err: Error) => {},
    });
  }
  suggestions: SuggestionResponse[] = [];
  searchProducts(inputValue: string): void {
    this.service
      .Fetch<SuggestionResponse[]>(`products/suggestions/${inputValue}`)
      .subscribe({
        next: (response) => {
          this.suggestions = response.result;
        },
        error: (err: Error) => {
          this.suggestions = [];
        },
      });
  }

  navigateToProduct(
    categoryId: string,
    subCategoryId: string,
    productName: string,
    input: any
  ): void {
    input.value = productName;
    this.router.navigate([
      `/customer/products/${categoryId}/subcategories/${subCategoryId}`,
    ]);
    this.suggestions = [];
  }
}
