import {Component, OnInit} from "@angular/core";
import {AddressBookService} from "../address-book.service";
import {AddresssBookMode} from "./address-book-explorer/address-book-explorer.component"
import * as FileSaver from "file-saver"
import {Address} from "../address";
import {Router} from "@angular/router";

@Component({
    selector: "app-adress-book",
    templateUrl: "./adress-book.component.html",
    styleUrls: ["./adress-book.component.css"]
})
export class AdressBookComponent implements OnInit {
    searchString: string;
    constructor(private addressService: AddressBookService,
                private router: Router,) {
    }

    kownAddressesAsJson() {
        let addressExport = new Blob([this.addressService.knownAddressesAsJson()]
            , {type: "application/json"});
        FileSaver.saveAs(addressExport, 'address-book.json')
    }

    ngOnInit() {
    }

    thereAreAddressesToExport() {
        return (this.addressService.knownAddresses.length > 0);
    }

    editMode() {
        return AddresssBookMode.EDITION;
    }

    addressSelected($event: Address) {
        this.router.navigate(['/address',$event.name]);
    }
}
