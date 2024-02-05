import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../../services/base.service';
import { ProductItemResponse } from '../../../../models/product';
import { environment } from '../../../../environment/environment';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BaseService,
    private sharedService: SharedService,
  ) {}
  id!: string;
  products: ProductItemResponse[] = [];
  baseUrl: string = environment.imageBasePath;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });
    this.getAllProductsByCategory(this.id);

    this.sharedService.productEventEmitter.subscribe({
      next: (response: any) => {
        this.getAllProductsByCategory(response);
      },
    });
  }

  getAllProductsByCategory(id: string): void {
    this.service
      .Fetch<ProductItemResponse[]>(`products/categoryid/${id}`)
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
