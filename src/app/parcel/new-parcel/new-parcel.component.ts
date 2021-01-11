import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Address} from "../../address/address";

import {AddressBookService} from "../../address/address-book.service";
import {ParcelBasketService} from "../parcel-basket.service";
import {AddresssBookMode} from "../../address/adress-book/address-book-explorer/address-book-explorer.component";

@Component({
    selector: "app-new-parcel",
    templateUrl: "./new-parcel.component.html",
    styleUrls: ["./new-parcel.component.css"]
})
export class NewParcelComponent implements OnInit {
    searchString: string;
    @Output() newParcelEvent = new EventEmitter<number>();

    constructor(
        private addressService: AddressBookService,
        private basketService: ParcelBasketService
    ) {
    }

    ngOnInit() {
    }

    addAddressToBasket(address: Address) {
        this.basketService.addAddressToBasket(address);
        this.newParcelEvent.emit(this.basketService.basketSize());
        console.log("Added address : ");
        console.log(address);
    }

    selectBookMode() {
        return AddresssBookMode.SELECTION;
    }

    newSearchString($event: string) {
        this.searchString=$event;
    }
}
