import {Injectable} from "@angular/core";
import {Address} from "./address";

@Injectable()
export class AddressBookService {
    DB_NAME: string = "parcel_composer";
    ADDRESS_STORE_NAME: string = "addresses";
    dbConnection;
    indexeddbUnsupported = false;
    private reloadAddressesRequest: IDBRequest;

    constructor() {
        console.log("Instanciating AddressBookService");
        if (!window.indexedDB) {
            console.log("indexedDB not supported");
            this.dbConnection = null;
            this.indexeddbUnsupported = true;
        } else {
            console.log("OK for indexedDB");
            let openRequest = window.indexedDB.open(this.DB_NAME, 1);
            openRequest.onsuccess = event => {
                console.log("IndexedDB ready");
                this.dbConnection = openRequest.result;
                this.reloadKnownAddresses();
            };
            openRequest.onerror = event => {
                console.warn("indexedDB not supported");
                console.warn(event);
                this.indexeddbUnsupported = true;
            };
            openRequest.onupgradeneeded = event => {
                console.log("indexedDB needs an upgrade !");
                this.dbConnection = openRequest.result;
                this.dbConnection.createObjectStore(this.ADDRESS_STORE_NAME, {
                    keyPath: "name"
                });
            };
        }
    }

    reloadKnownAddresses() {
        console.log("reloading address")
        let transaction = this.dbConnection.transaction(this.ADDRESS_STORE_NAME);
        let addressesStore = transaction.objectStore(this.ADDRESS_STORE_NAME);
        this.reloadAddressesRequest = addressesStore.getAll();
        this.reloadAddressesRequest.onsuccess = event => {
            this.knownAddresses =
                this.reloadAddressesRequest.result
                    .map(ia => Address.fromObject(ia));
            console.log("Reloaded " + this.knownAddresses.length + " addresses from store");
        };
    }

    knownAddresses: Address[] = [];

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
        if (this.isIndexedDBAvailable()) {
            let transaction = this.dbConnection.transaction(
                this.ADDRESS_STORE_NAME,
                "readwrite"
            );
            transaction.onsuccess = e => {
                console.log("Transaction successfully completed");
            };
            let addressesStore = transaction.objectStore(this.ADDRESS_STORE_NAME);
            addressesStore.put(address);
            console.log("Address persisted");
        }
    }

    private isIndexedDBAvailable() {
        return !this.indexeddbUnsupported && this.dbConnection != null;
    }

    knownAddressesAsJson() {
        return JSON.stringify(this.knownAddresses);
    }

    private openAddressesStore() {
        if (this.isIndexedDBAvailable()) {
            let transaction = this.dbConnection.transaction(
                this.ADDRESS_STORE_NAME,
                "readwrite"
            );
            transaction.oncomplete = e => {
                console.log("Transaction succeeded");
            };
            transaction.onerror = e => {
                console.log("Transaction failed");
            }
            return transaction.objectStore(this.ADDRESS_STORE_NAME);
        }
    }

    truncateBook() {
        console.log("Truncating address book")
        this.knownAddresses = [];
        let addressesStore = this.openAddressesStore();
        let clearRequest = addressesStore.clear();
        clearRequest.onsuccess = e => {
            console.log("Address book store successfully truncated");
        };
        clearRequest.onerror = e => {
            console.log("Failed to truncate address book ");
            console.log(e);
        };
    }

    removeAddress(address: Address) {
        this.knownAddresses = this.knownAddresses.filter(a => a != address);
        let addressesStore = this.openAddressesStore();
        let removeRequest = addressesStore.delete(address.name);
        removeRequest.onsuccess = e => {
            console.log(address.name + " successfully removed from DB");
        };
        removeRequest.onerror = e => {
            console.log("Failed to remove " + address.name + " from address book ");
            console.log(e);
        };
    }
}