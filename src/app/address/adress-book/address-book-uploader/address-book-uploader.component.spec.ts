import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookUploaderComponent } from './address-book-uploader.component';

describe('AddressBookUploaderComponent', () => {
  let component: AddressBookUploaderComponent;
  let fixture: ComponentFixture<AddressBookUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressBookUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
