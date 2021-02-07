import {Injectable} from '@angular/core';
import {Observable, Observer, of} from "rxjs";
import {map} from "rxjs/operators";

//TODO : Use Promises instead of Observable
@Injectable({
    providedIn: 'root'
})
export class RepositoryService {
    DB_NAME: string = "parcel_composer";
    DB_VERSION: number = 2;
    private dbConnection: IDBDatabase;
    private openRequestObs: Observable<string>;
    private ADDRESS_STORE_NAME = "addresses";
    private ADDRESS_STORE_KEYPATH = "name";
    private CUSTONMAPS_STORE_NAME = "customers_map";
    private CUSTONMAPS_STORE_KEYPATH = "postAddressAsKey";

    private initDBConnection() {
        this.dbConnection = null;
        if (window.indexedDB) {
            this.openRequestObs = new Observable((observer: Observer<string>) => {
                console.log("DB connection ");
                let openRequest = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);
                openRequest.onsuccess = (event: Event) => {
                    console.log("DB connected " + (<IDBOpenDBRequest>event.target).readyState);
                    this.dbConnection = (<IDBOpenDBRequest>event.target).result;
                    observer.next((<IDBOpenDBRequest>event.target).readyState);
                    observer.complete();
                }
                openRequest.onerror = (event) => {
                    console.log('IndexedDB service: ' + (<IDBOpenDBRequest>event.target).error.name);
                    observer.error((<IDBOpenDBRequest>event.target).error.name);
                };
                openRequest.onupgradeneeded = (event) => {
                    this.dbConnection = (<IDBOpenDBRequest>event.target).result;
                    this.upgradeDB(event.oldVersion);
                    console.log("indexedDB needs an upgrade !");
                };
            })
        }
    }

    constructor() {
        this.initDBConnection();
    }

    /*
    Note on changeToApply parameter : when returning an Observable<IDBObjectStore> and then using pipe
    to perform the request, it failed in some cases because the transaction was already completed..
    Not much found on the internet but it looks like there could be too much delay between the transaction creation
    and the request to the store. By timing the 2, I could notice that as soon as there were more than 4 ms between the 2
    it seemed to fail
     */
    private applyOnObjectStore(addressStoreName: string, transactionMode: IDBTransactionMode, changeToApply: (store: IDBObjectStore) => IDBRequest): Observable<any> {
        if (this.dbConnection) {
            let idbTransaction = this.dbConnection
                .transaction(addressStoreName, transactionMode);
            idbTransaction.onerror = ev => {
                console.error("Error on transaction ");
                console.error(ev);
            }
            return of(changeToApply(idbTransaction.objectStore(addressStoreName))
            );
        } else {
            return this.openRequestObs.pipe(
                map((value, index) => changeToApply(this.dbConnection
                    .transaction(addressStoreName, transactionMode)
                    .objectStore(addressStoreName)))
            );
        }
    }

    applyOnAddressesObjectStore(transactionMode: IDBTransactionMode, changeToApply: (store: IDBObjectStore) => IDBRequest) {
        return this.applyOnObjectStore(this.ADDRESS_STORE_NAME, transactionMode, changeToApply)
    }

    applyOnCustomersOnMapObjectStore(transactionMode: IDBTransactionMode, changeToApply: (store: IDBObjectStore) => IDBRequest) {
        return this.applyOnObjectStore(this.CUSTONMAPS_STORE_NAME, transactionMode, changeToApply)
    }

    private upgradeDB(oldVersion: number) {
        if (!oldVersion || oldVersion < 1) {
            console.log("need to create store " + this.ADDRESS_STORE_NAME);
            this.dbConnection.createObjectStore(this.ADDRESS_STORE_NAME, {
                keyPath: this.ADDRESS_STORE_KEYPATH
            });
        }
        if (!oldVersion || oldVersion < 2) {
            console.log("need to create store " + this.CUSTONMAPS_STORE_NAME);
            this.dbConnection.createObjectStore(this.CUSTONMAPS_STORE_NAME, {
                keyPath: this.CUSTONMAPS_STORE_KEYPATH
            });
        }
    }
}
