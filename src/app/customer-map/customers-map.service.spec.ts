import {TestBed} from '@angular/core/testing';

import {CustomersMapService} from './customers-map.service';
import {fromArray} from "rxjs/internal/observable/fromArray";
import {map, mergeAll} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {AddressBookService} from "../address/address-book.service";
import {RepositoryService} from "../infrastructure/repository.service";

describe('CustomersMapService', () => {
    let service: CustomersMapService;
    let httpService: HttpClient;
    let addresService : jasmine.SpyObj<AddressBookService>;
    let httpClient : jasmine.SpyObj<HttpClient>;
    let repositoryService: jasmine.SpyObj<RepositoryService>

    beforeEach(() => {
        const addressSpy = jasmine.createSpyObj('AddressBookService',['knownAddresses'])
        const httpSpy = jasmine.createSpyObj('HttpClient',['get'])
        const repositoryServer = jasmine.createSpyObj('RepositoryService',['applyOnCustomersOnMapObjectStore'])
        TestBed.configureTestingModule({providers: [CustomersMapService,
                {provide: AddressBookService, useValue: addressSpy},
                {provide: HttpClient, useValue: httpClient},
                {provide: RepositoryService, useValue: repositoryServer}
            ]});
        service = TestBed.inject(CustomersMapService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
