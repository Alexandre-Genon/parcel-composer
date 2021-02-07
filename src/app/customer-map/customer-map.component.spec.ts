import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMapComponent } from './customer-map.component';
import {CustomersMapService} from "./customers-map.service";
import {AddressBookService} from "../address/address-book.service";

describe('CustomerMapComponent', () => {
  let component: CustomerMapComponent;
  let fixture: ComponentFixture<CustomerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMapComponent ],
        providers:[CustomersMapService,AddressBookService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
