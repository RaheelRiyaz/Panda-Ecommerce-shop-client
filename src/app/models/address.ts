export class AddressResponse {
  id!: string;
  userName!: string;
  fullName!: string;
  landMark!: string;
  city!: string;
  street!: string;
  contactNo!: string;
  country!: string;
  state!: string;
  email!: string;
  houseNo!: number;
  pincode!: number;
  isDefault!: boolean;
}
export class AddressRequest {
  pincode!: number;
  countryId: string = '';
  stateId: string = '';
  landMark!: string;
  city!: string;
  street!: string;
  houseNo!: string;
  contactNo!: string;
  fullName!: string;
  isDefault: boolean = false;
}

export class CountryResponse {
  name!: string;
  id!: string;
}

export class StateResponse extends CountryResponse {}
