import {Injectable} from "@angular/core";
import {Address} from "./address";
import {RepositoryService} from "../infrastructure/repository.service";

@Injectable()
export class AddressBookService {
    knownAddresses: Address[] = [];

    constructor(private repository: RepositoryService) {
        console.log("Instanciating AddressBookService");
        this.reloadKnownAddresses();
    }

    reloadKnownAddresses() {
        console.log("Reloading addresses")
        this.repository.applyOnAddressesObjectStore("readonly", store => store.getAll())
            .subscribe(reloadAddressesRequest => {
                reloadAddressesRequest.onsuccess = event => {
                    this.knownAddresses =
                        reloadAddressesRequest.result
                            .map(ia => Object.assign(new Address(),ia));
                    console.log("Reloaded " + this.knownAddresses.length + " addresses from store");
                };
            })
    }


    searchByName(searchString: string): Address[] {
        const normalizedSearchString = searchString.toLowerCase();
        return this.knownAddresses.filter(a =>
            a.name.toLowerCase().includes(normalizedSearchString)
        );
    }

    extractAddressFromString(addressString: string): Address {
        let address = Address.fromString(addressString);
        console.log("Address parsed");
        console.log(address);
        return address;
    }


    addAddress(address: Address) {
        this.knownAddresses.push(address);
        this.persistToDB(address);
    }

    upsertAddress(address: Address) {
        console.log("Upserting address");
        console.log(address);
        let indexOf = this.knownAddresses.indexOf(address);
        if (indexOf < 0) {
            this.knownAddresses.push(address);
        } else {
            this.knownAddresses[indexOf] = address;
        }
        this.persistToDB(address);
    }

    private persistToDB(address: Address) {
        this.repository.applyOnAddressesObjectStore("readwrite", store => store.put(address))
            .subscribe(request => {
                request.onerror = e => {
                    console.log("Failed to truncate address book ");
                    console.log(e);
                };
            });
    }

    knownAddressesAsJson() {
        return JSON.stringify(this.knownAddresses);
    }

    truncateBook() {
        console.log("Truncating address book")
        this.knownAddresses = [];
        this.repository.applyOnAddressesObjectStore("readwrite", store => store.clear())
            .subscribe(clearRequest => {
                clearRequest.onsuccess = e => {
                    console.log("Address book store successfully truncated");
                };
                clearRequest.onerror = e => {
                    console.log("Failed to truncate address book ");
                    console.log(e);
                };
            });
    }

    removeAddress(address: Address) {
        this.knownAddresses = this.knownAddresses.filter(a => a != address);
        this.repository.applyOnAddressesObjectStore("readwrite", store => store.delete(address.name))
            .subscribe(removeRequest => {
                removeRequest.onsuccess = e => {
                    console.log(address.name + " successfully removed from DB");
                };
                removeRequest.onerror = e => {
                    console.log("Failed to remove " + address.name + " from address book ");
                    console.log(e);
                };
            });
    }
}