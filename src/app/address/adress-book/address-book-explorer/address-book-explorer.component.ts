import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from "../../address";
import {AddressBookService} from "../../address-book.service";

export enum AddresssBookMode{
    SELECTION,
    EDITION
}

@Component({
    selector: 'app-address-book-explorer',
    templateUrl: './address-book-explorer.component.html',
    styleUrls: ['./address-book-explorer.component.css']
})
export class AddressBookExplorerComponent implements OnInit {
    addressesColumns: string[] = ["Action", "Name", "Address", "Email"];
    @Input("addressBookMode") addressBookMode:AddresssBookMode;
    @Input("searchString")
    get searchString():string {return this._searchString;}
    set searchString(newSearchString: string) {
        this._searchString = newSearchString;
        if(this.searchString && this.searchString.trim()) {
            this.currentSelection = this.addressService.searchByName(this.searchString);
        } else{
            this.reinitBook();
        }
    }
    private _searchString: string;

    @Output("addressSelected") addressSelectedEvent = new EventEmitter<Address>();

    currentSelection: Address[];

    constructor(private addressService: AddressBookService) {

    }

    ngOnInit(): void {
        this.reinitBook();
    }

    private reinitBook() {
        if (this.addressBookMode == AddresssBookMode.SELECTION) {
            this.currentSelection = [];
        } else {
            this.currentSelection = this.addressService.knownAddresses;
        }
    }

    addressSelected(address:Address): void{
        this.addressSelectedEvent.emit(address);
    }

    actionLabel() {
        return this.addressBookMode== AddresssBookMode.EDITION?"Editer":"Ajouter";
    }
}
