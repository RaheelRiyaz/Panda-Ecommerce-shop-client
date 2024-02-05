import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductItemResponse } from '../../../../models/product';
import { environment } from '../../../../environment/environment';
import { SharedService } from '../../../../services/shared.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sub-products',
  templateUrl: './sub-products.component.html',
  styleUrl: './sub-products.component.scss',
})
export class SubProductsComponent {
  constructor(
    private service: BaseService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  subcategoryid: string = '';
  products: ProductItemResponse[] = [];
  baseUrl: string = environment.imageBasePath;
  url: string = '';
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.subcategoryid = response['subcategoryid'];
      },
      error: (err: Error) => {},
    });
    this.url = this.router.url.slice(0, this.router.url.lastIndexOf('/') - 13);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
        this.getProductsBySubCategory();
      });
    this.sharedService.subcategoryEventEmitter.subscribe({
      next: (response: any) => {
        this.subcategoryid = response;
        this.getProductsBySubCategory();
      },
    });
    this.getProductsBySubCategory();
  }

  getProductsBySubCategory(): void {
    this.service
      .Fetch<ProductItemResponse[]>(
        `products/subcategory/${this.subcategoryid}`
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.products = response.result;
          else this.products = [];
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
