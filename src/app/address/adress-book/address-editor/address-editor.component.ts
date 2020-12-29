import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {AddressBookService} from "../../address-book.service";
import {Observable} from "rxjs";
import {Address} from "../../address";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-address-editor',
    templateUrl: './address-editor.component.html',
    styleUrls: ['./address-editor.component.css']
})
export class AddressEditorComponent implements OnInit {
    address: Address;
    addressEdition: FormGroup;

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
        this.route.paramMap.pipe(
            map((params: ParamMap) => this.addressService.searchByName(params.get('name'))[0]),
            filter(a=> (a!== undefined))
        ).subscribe(a => this.newAddress(a));
    }

    onSave(formFields): void {
        this.address.name = formFields.name;
        this.address.street = formFields.street;
        this.address.street_nb = formFields.street_nb;
        this.address.postcode = formFields.postcode;
        this.address.postboxLetter = formFields.postbox_letter;
        this.address.city = formFields.city;
        this.address.email = formFields.email;
        this.address.originalString = formFields.original_string;
        this.addressService.updateAddress(this.address);
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
}
