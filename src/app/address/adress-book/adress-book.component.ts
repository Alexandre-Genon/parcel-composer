import { Component, OnInit } from "@angular/core";
import { AddressBookService } from "../address-book.service";

@Component({
  selector: "app-adress-book",
  templateUrl: "./adress-book.component.html",
  styleUrls: ["./adress-book.component.css"]
})
export class AdressBookComponent implements OnInit {
  constructor(private addressService: AddressBookService) {}
  addressExport = "";

  kownAddressesAsJson() {
    this.addressExport = this.addressService.knownAddressesAsJson();
  }

  ngOnInit() {}
}
