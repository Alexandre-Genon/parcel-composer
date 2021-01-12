import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressEditorComponent} from './address-editor.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {AddressBookService} from "../../address-book.service";

describe('AddressEditorComponent', () => {
    let component: AddressEditorComponent;
    let fixture: ComponentFixture<AddressEditorComponent>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule,ReactiveFormsModule],
            providers:[AddressBookService],
            declarations: [AddressEditorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        TestBed.inject(AddressBookService);
        fixture = TestBed.createComponent(AddressEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
