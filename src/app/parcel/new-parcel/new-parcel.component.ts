import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
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
    searchForm: FormGroup;
    searchString: Observable<string>;
    @Output() newParcelEvent = new EventEmitter<number>();

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
        this.searchString = this.searchForm
            .get("original_string")
            .valueChanges
            .pipe(
                // Get the first line if exists
                map(value => value && value.split(/\r\n|\r|\n/)[0].trim())
            );
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

    onAdd(formFields) {
        let address = new Address();
        address.name = formFields.name;
        address.street = formFields.street;
        address.street_nb = formFields.street_nb;
        address.postcode = formFields.postcode;
        address.postboxLetter = formFields.postbox_letter;
        address.city = formFields.city;
        address.email = formFields.email;
        address.originalString = formFields.original_string;
        this.addAddressToBasket(address,false);
    }

    addKnownAddress(address: Address) {
        this.addAddressToBasket(address,true);
    }

    addAddressToBasket(address: Address,existing: boolean) {
        if (!existing) {
            this.addressService.addAddress(address);
        }
        this.basketService.addAddressToBasket(address);
        this.searchForm.reset();
        this.newParcelEvent.emit(this.basketService.basketSize());
        console.log("Added address : ");
        console.log(address);
    }

    addressCanBeExtracted(formFields): boolean {
        return (formFields.original_string != null) && (formFields.original_string.length > 0);
    }

    selectBookMode() {
        return AddresssBookMode.SELECTION;
    }
}
