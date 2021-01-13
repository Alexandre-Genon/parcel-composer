import { NewParcelComponent } from './new-parcel.component';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {ParcelBasketService} from "../parcel-basket.service";
import {AddressBookService} from "../../address/address-book.service";

describe('NewParcelComponent', () => {
    let component: NewParcelComponent;
    let fixture: ComponentFixture<NewParcelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule,ReactiveFormsModule],
            providers:[ParcelBasketService,AddressBookService],
            declarations: [NewParcelComponent]
        })
            .compileComponents();
    });
    beforeEach(() => {
        TestBed.inject(ParcelBasketService);
        fixture = TestBed.createComponent(NewParcelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
