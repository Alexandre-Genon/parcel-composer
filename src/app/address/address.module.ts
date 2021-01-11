import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddressRoutingModule} from './address-routing.module';
import {AdressBookComponent} from "./adress-book/adress-book.component";
import {AddressBookExplorerComponent} from "./adress-book/address-book-explorer/address-book-explorer.component";
import {AddressBookUploaderComponent} from "./adress-book/address-book-uploader/address-book-uploader.component";
import {AddressEditorComponent} from "./adress-book/address-editor/address-editor.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        AdressBookComponent,
        AddressBookUploaderComponent,
        AddressEditorComponent,
        AddressBookExplorerComponent,
    ],
    imports: [
        CommonModule,
        AddressRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
    ],
    exports: [
        AddressBookExplorerComponent,
        AddressEditorComponent
    ]
})
export class AddressModule {
}
