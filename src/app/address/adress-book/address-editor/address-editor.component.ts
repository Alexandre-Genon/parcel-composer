import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {AddressBookService} from "../../address-book.service";
import {Address} from "../../address";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-address-editor',
    templateUrl: './address-editor.component.html',
    styleUrls: ['./address-editor.component.css']
})
export class AddressEditorComponent implements OnInit {
    @Input("input_address") inputAddress: Address;

    address: Address;
    addressEdition: FormGroup;
    @Output() newSearchStringEvent = new EventEmitter<string>();
    @Output() newAddressEvent  = new EventEmitter<Address>();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private addressService: AddressBookService) {
        this.addressEdition = this.formBuilder.group({
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

    ngOnInit(): void {
        if(this.inputAddress){
            this.newAddress(this.inputAddress);
        } else {
            this.route.paramMap.pipe(
                map((params: ParamMap) => params.get('name') && this.addressService.searchByName(params.get('name'))[0]),
                filter(Boolean) // Clever way to filter out falsy values (thanks SO https://stackoverflow.com/a/32906951)
            ).subscribe((a:Address) => this.newAddress(a as Address));
        }
        this.addressEdition
            .get("original_string")
            .valueChanges
            .subscribe(value => {
                if (value) {
                    this.newSearchStringEvent.emit(value.split(/\r\n|\r|\n/)[0].trim())
                }
            });
    }

    onSave(formFields): void {
        if(!this.address){
            this.address = new Address();
        }
        this.address.name = formFields.name;
        this.address.street = formFields.street;
        this.address.street_nb = formFields.street_nb;
        this.address.postcode = formFields.postcode;
        this.address.postboxLetter = formFields.postbox_letter;
        this.address.city = formFields.city;
        this.address.email = formFields.email;
        this.address.originalString = formFields.original_string;
        this.addressService.upsertAddress(this.address);
        this.newAddressEvent.emit(this.address);
    }

    private newAddress(address: Address) {
        this.address = address;
        this.addressEdition.setValue({
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

    deleteAddress(address: Address) {
        this.addressService.removeAddress(address);
    }

    extractAddressFromName(addressEdition) {
        let address = this.addressService.extractAddressFromString(
            addressEdition.original_string
        );

        this.addressEdition.setValue({
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

    addressCanBeExtracted(addressEdition) {
        return (addressEdition.original_string != null) && (addressEdition.original_string.length > 0);
    }
}
