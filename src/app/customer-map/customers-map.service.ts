import {Injectable} from '@angular/core';
import {AddressBookService} from "../address/address-book.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Address} from "../address/address";
import {catchError, concatAll, delay, map, mergeAll} from "rxjs/operators";
import {CustomerOnMap} from "./customer-on-map";
import {concat, from, interval, Observable, of, partition, zip} from "rxjs";
import {RepositoryService} from "../infrastructure/repository.service";

@Injectable({
    providedIn: 'root'
})
export class CustomersMapService {
    private httpParams: HttpParams;
    private requestHeader: HttpHeaders;
    private URL = "https://nominatim.openstreetmap.org/search.php";
    private httpRequestTimestamp: number = 0;


    constructor(private addressService: AddressBookService,
                private httpClient: HttpClient,
                private repository: RepositoryService) {
        console.log("Instanciating CustomerMapService");
        this.setHttpClientOption();
    }

    private setHttpClientOption() {
        this.httpParams = new HttpParams().set('format', 'jsonv2')
            .set('addressdetails', '1');
        this.requestHeader = new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        })
    }


    private recordCustomerOnMap(customerOnMap: CustomerOnMap) {
        console.log(customerOnMap);
        this.repository
            .applyOnCustomersOnMapObjectStore("readwrite", store => store.put(customerOnMap));
    }

    /**
     * Returns an Observable emitting either the CustomerOnMap entity saved in local DB if present
     * Otherwise emits the original Address entity so that further lookup can be made (i.e. API)
     * @param address
     * @private
     */
    private getCustomerOnMapFromDB(address: Address): Observable<CustomerOnMap | Address> {
        return this.repository
            .applyOnCustomersOnMapObjectStore("readonly", store => store.get(address.postAddressToString()))
            .pipe(
                map(request => new Observable<CustomerOnMap | Address>(subscriber => {
                        request.onsuccess = (ev => {
                            let result = (<IDBRequest>ev.target).result;
                            if (result) {
                                let customerOnMap:CustomerOnMap = Object.assign(new CustomerOnMap(),result);
                                subscriber.next(customerOnMap);
                            } else {
                                subscriber.next(address);
                            }
                            subscriber.complete();
                        });
                        request.onerror = (ev => {
                            subscriber.complete();
                        });
                    })
                ),
                concatAll()
            );
    }

    private getCustomerOnMapFromAPI(address: Address): Observable<CustomerOnMap> {
        console.log("Getting for "+typeof address);
        console.log(address);
        this.httpParams = this.httpParams.set('q', address.postAddressToString());
        return this.httpClient.get<any[]>(this.URL,
            {
                params: this.httpParams,
                headers: this.requestHeader,
                responseType: 'json'
            }).pipe(
            catchError((error) => {
                console.error("HTTP error, it happens and it's not critical here");
                console.error(error);
                return of([]);
            }),
            map(result => {
                console.log(result);
                var newCustomerOnMap: CustomerOnMap;
                if (result.length > 0) {
                    newCustomerOnMap = new CustomerOnMap(address, result[0].lat, result[0].lon)
                } else {
                    newCustomerOnMap = new CustomerOnMap(address, undefined, undefined);
                }
                this.recordCustomerOnMap(newCustomerOnMap);
                return newCustomerOnMap;
            })
        );
    }


    coordFromAddresses(): Observable<CustomerOnMap> {
        /** First get all customer we can get from the DB, we should expect some Address for cases not in DB */
        let customerOnMapInDb = from(this.addressService.knownAddresses)
            .pipe(
                map((address) => this.getCustomerOnMapFromDB(address)),
                concatAll()
            );
        /* Partition between the CustomerOnMap entities (good to go) and the addresses (there was nothing in DB)
         * We'll try with the API for the addresses
         */
        let customerOnMapSplit = partition(customerOnMapInDb, (com, index) => com instanceof CustomerOnMap);
        let areFromDB = customerOnMapSplit[0].pipe(
            map(combined => combined as CustomerOnMap)
        );
        /* We put a delay of 2s to avoid overloading the API */
        let needAPIRequest = zip(customerOnMapSplit[1], interval(2000)).pipe(
            /* Has to force the casting to Address since, typewise, we still have a union type CustomerOnMap|Address */
            map(([combined, time]) => combined as Address),
            map((address) => this.getCustomerOnMapFromAPI(address)),
            mergeAll()
        )
        return concat(areFromDB, needAPIRequest);
    }

    clearCache() {
        this.repository.applyOnCustomersOnMapObjectStore("readwrite",
            store => store.clear());
    }
}
