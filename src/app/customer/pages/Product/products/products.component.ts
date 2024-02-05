import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../../../services/base.service';
import { SubcategoryResponse } from '../../../../models/category';
import { environment } from '../../../../environment/environment';
import { SharedService } from '../../../../services/shared.service';
import {
  ProductItemResponse,
  SuggestionResponse,
} from '../../../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BaseService,
    protected sharedService: SharedService,
    private router: Router
  ) {}
  id!: string;
  baseUrl: string = environment.imageBasePath;
  subcategories: SubcategoryResponse[] = [];
  subcategoryid!: string;
  showFilter: boolean = false;

  showFilterRange(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => (this.subcategoryid = response['subcategoryid']),
    });
    this.showFilter = true;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => (this.id = response['id']),
    });

    this.getSubcategories(this.id);

    this.sharedService.productEventEmitter.subscribe({
      next: (response: any) => {
        this.getSubcategories(response);
      },
    });
  }

  getSubcategories(id: string): void {
    this.service
      .Fetch<SubcategoryResponse[]>(`categories/sub-categories/${id}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.subcategories = response.result;
        },
        error: (err: Error) => {},
      });
  }

  getAllProducts(): void {
    this.service
      .Fetch<ProductItemResponse[]>(`products/subcategory/${this.id}`)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  filterByPrice(min: string, max: string): void {
    console.log(min);
    console.log(max);
    console.log(this.subcategoryid);
    
  }
}
