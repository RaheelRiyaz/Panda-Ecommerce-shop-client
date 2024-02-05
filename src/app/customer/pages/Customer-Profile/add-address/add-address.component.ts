import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import {
  AddressRequest,
  AddressResponse,
  CountryResponse,
  StateResponse,
} from '../../../../models/address';
import { environment } from '../../../../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss',
})
export class AddAddressComponent {
  constructor(private service: BaseService, private router: Router) {}
  countriesResponse: CountryResponse[] = [];
  stateResponse: StateResponse[] = [];
  hideStates: boolean = true;
  addRessRequest: AddressRequest = new AddressRequest();
  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.service.Fetch<CountryResponse[]>('countries').subscribe({
      next: (response) => {
        this.countriesResponse = response.result;
      },
    });
  }

  getStates(id: string): void {
    if (id !== '') {
      this.hideStates = false;
      this.service.Fetch<StateResponse[]>(`countries/states/${id}`).subscribe({
        next: (response) => {
          this.stateResponse = response.result;
        },
        error: (err: Error) => {},
      });
    } else this.hideStates = true;
  }

  addAddress(): void {
    this.service
      .Post<AddressRequest, AddressResponse>(this.addRessRequest, 'addresses')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSwal(response.message);
            this.router.navigate(['/customer/profile/address']);
          } else environment.fireSwal(response.message, 'error');
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, 'error');
        },
      });
  }
}
