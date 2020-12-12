import { Component, OnInit } from "@angular/core";
import { AddressBookService } from "../address-book.service";
import * as FileSaver from "file-saver"

@Component({
  selector: "app-adress-book",
  templateUrl: "./adress-book.component.html",
  styleUrls: ["./adress-book.component.css"]
})
export class AdressBookComponent implements OnInit {
  constructor(private addressService: AddressBookService) {}

  kownAddressesAsJson() {
    let addressExport= new Blob([this.addressService.knownAddressesAsJson()]
        ,{type:"application/json"});
    FileSaver.saveAs(addressExport,'address-book.json')
  }

  ngOnInit() {}
}
