import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { AddressResponse } from '../../../../models/address';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent {
  constructor(private service: BaseService) {}
  addresses: AddressResponse[] = [];
  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(): void {
    this.service.Fetch<AddressResponse[]>('addresses/all-addresses').subscribe({
      next: (response) => {
        console.log(response);
        this.addresses = response.result;
      },
      error: (err: Error) => {},
    });
  }

  makeAddressAsDefault(addressId: string): void {
    this.service
      .Update<any, string>({ addressId }, 'addresses/make-default')
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            this.getAddresses();
          } else environment.fireSwal(response.message, 'error');
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, 'error');
        },
      });
  }

  removeAddress(id: string, isDefault: boolean): void {
    const message1 =
      'This address is used as your residential address for digital purchases. To delete this address, first set a different residential address for your digital purchases';

    const message2 =
      'Please note: Deleting this address will not delete any pending orders being shipped to this address. To ensure uninterrupted fulfillment of future orders, please update any wishlists, subscribe and save settings and periodical subscriptions using this address.';

    environment
      .fireConfirmSwal(
        'Are you sure you want to delete this address?',
        isDefault ? message1 : message2
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.service.Delete<string>(`addresses/${id}`).subscribe({
            next: (response) => {
              console.log(response);
              if (response.isSuccess) {
                this.getAddresses();
                environment.fireSwal(response.message);
              } else environment.fireSwal(response.message,'error');
            },
            error: (err: Error) => {
              environment.fireSwal(err.message,'error');
            },
          });
        }
      });
  }
}
