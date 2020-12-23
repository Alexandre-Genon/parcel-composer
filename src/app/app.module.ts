import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import {AppComponent} from "./app.component";
import {AddressBookService} from "./address/address-book.service";
import {AdressBookComponent} from "./address/adress-book/adress-book.component";
import {NewParcelComponent} from "./parcel/new-parcel/new-parcel.component";
import {ParcelBasketService} from "./parcel/parcel-basket.service";
import {ParcelBasketComponent} from "./parcel/parcel-basket/parcel-basket.component";
import {AddressBookUploaderComponent} from "./address/adress-book/address-book-uploader/address-book-uploader.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

    ],
    declarations: [
        AppComponent,
        ParcelBasketComponent,
        NewParcelComponent,
        AdressBookComponent,
        AddressBookUploaderComponent
    ],
    bootstrap: [AppComponent],
    providers: [ParcelBasketService, AddressBookService]
})
export class AppModule {
}
