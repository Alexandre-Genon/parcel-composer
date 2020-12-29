import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParcelUiComponent} from './parcel-ui.component';
import {ParcelBasketService} from "../parcel-basket.service";
import {AddressBookService} from "../../address/address-book.service";

describe('ParcelUiComponent', () => {
    let component: ParcelUiComponent;
    let parcelService: ParcelBasketService;
    let fixture: ComponentFixture<ParcelUiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParcelUiComponent],
            providers: [ParcelBasketService,AddressBookService]
        })
            .compileComponents();
        parcelService=TestBed.inject(ParcelBasketService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParcelUiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
