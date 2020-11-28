import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Address } from "../../address/address";

import { AddressBookService } from "../../address/address-book.service";
import { ParcelBasketService } from "../parcel-basket.service";

@Component({
  selector: "app-new-parcel",
  templateUrl: "./new-parcel.component.html",
  styleUrls: ["./new-parcel.component.css"]
})
export class NewParcelComponent implements OnInit {
  proposedAddresses: Observable<Address[]>;
  proposedAddressesColumns: string[] = ["Add", "Name", "Address", "Email"];
  searchForm: FormGroup;
  searchString: string;
  address: Address;
  existingAddress: Boolean;

  constructor(
    private addressService: AddressBookService,
    private formBuilder: FormBuilder,
    private basketService: ParcelBasketService
  ) {
    this.searchForm = this.formBuilder.group({
      original_string: "",
      name: "",
      street: "",
      street_nb: "",
      postbox_letter: "",
      postcode: "",
      city: "",
      email: ""
    });
  }

  ngOnInit() {
    this.proposedAddresses = this.searchForm
      .get("original_string")
      .valueChanges.pipe(map(value => this.searchForAddress(value)));
  }

  searchForAddress(searchString: string) {
    if (searchString != null && searchString.length >= 1) {
      let firstLine = searchString.split(/\r\n|\r|\n/)[0];
      return this.addressService.searchByName(firstLine);
    } else {
      return [];
    }
  }

  extractAddressFromName(formFields) {
    let address = this.addressService.extractAddressFromString(
      formFields.original_string
    );
    this.searchForm.setValue({
      original_string: address.originalString,
      name: address.name,
      street: address.street,
      street_nb: address.street_nb,
      postbox_letter: address.postboxLetter,
      postcode: address.postcode,
      city: address.city,
      email: address.email
    });
  }

  selectProposedAddress(address: Address) {
    this.address = address;
    this.existingAddress = true;
  }

  onAdd(formFields) {
    var address: Address;
    address = new Address();
    address.name = formFields.name;
    address.street = formFields.street;
    address.street_nb = formFields.street_nb;
    address.postcode = formFields.postcode;
    address.postboxLetter = formFields.postbox_letter;
    address.city = formFields.city;
    address.email = formFields.email;
    address.originalString = formFields.original_string;
    this.addAddressToBasket(address);
  }

  addRecord(address: Address) {
    this.existingAddress = true;
    this.addAddressToBasket(address);
  }

  addAddressToBasket(address: Address) {
    if (!this.existingAddress) {
      this.addressService.addAddress(address);
    }
    this.basketService.addAddressToBasket(address);
    this.searchForm.reset();
    this.existingAddress = false;
    console.log("Added address : ");
    console.log(address);
  }
}
