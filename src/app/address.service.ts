import { Injectable } from "@angular/core";
import { Address } from "./address";

@Injectable()
export class AddressService {
  DB_NAME: string = "parcel_composer";
  ADDRESS_STORE_NAME: string = "addresses";
  dbConnection;
  indexeddbUnsupported = false;

  constructor() {
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

  reloadKnownAddresses() {
    let transaction = this.dbConnection.transaction(this.ADDRESS_STORE_NAME);
    let addressesStore = transaction.objectStore(this.ADDRESS_STORE_NAME);
    addressesStore.getAll().onsuccess = event => {
      this.knownAddresses = event.target.result;
      console.log(
        "Reloaded " + this.knownAddresses.length + " addresses from store"
      );
    };
  }

  addAddress(address: Address) {
    console.log("Adding address");
    console.log(address);
    this.knownAddresses.push(address);
    if (!this.indexeddbUnsupported && this.dbConnection != null) {
      let transaction = this.dbConnection.transaction(
        this.ADDRESS_STORE_NAME,
        "readwrite"
      );
      transaction.onsuccess = e => {
        console.log("Transaction successfully completed");
      };
      let addressesStore = transaction.objectStore(this.ADDRESS_STORE_NAME);
      addressesStore.put(address); //, address.name);
      console.log("Address persisted");
    }
  }

  knownAddressesAsJson() {
    return JSON.stringify(this.knownAddresses);
  }
}
