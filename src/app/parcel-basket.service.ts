import { Injectable } from "@angular/core";
import { Address } from "./address";
import { AddressService } from "./address.service";

@Injectable()
export class ParcelBasketService {
  parcelBasket: Address[] = [];

  constructor(private addressService: AddressService) {}

  addAddressToBasket(address: Address) {
    return this.parcelBasket.push(address);
  }

  removeAddressFromBasket(name: String) {
    this.parcelBasket = this.parcelBasket.filter(a => a.name != name);
  }

  listBasket() {
    return this.parcelBasket;
  }

  exportToBPostCSV(): string[] {
    return this.parcelBasket.map(a => this.toBPostCSV(a));
  }

  toBPostCSV(address: Address): string {
    var asCSV =
      address.name +
      "," +
      address.postcode +
      "," +
      address.city +
      "," +
      address.street +
      "," +
      address.street_nb +
      "," +
      address.email;
    return asCSV;
  }

  commitBasket(): string[] {
    return this.exportToBPostCSV();
  }
}
