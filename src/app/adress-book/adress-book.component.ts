import { Component, OnInit } from "@angular/core";
import { AddressService } from "../address.service";

@Component({
  selector: "app-adress-book",
  templateUrl: "./adress-book.component.html",
  styleUrls: ["./adress-book.component.css"]
})
export class AdressBookComponent implements OnInit {
  constructor(private addressService: AddressService) {}
  addressExport = "";

  kownAddressesAsJson() {
    this.addressExport = this.addressService.knownAddressesAsJson();
  }

  ngOnInit() {}
}
