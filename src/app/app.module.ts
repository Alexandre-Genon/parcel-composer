import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {AppComponent} from "./app.component";
import {AddressBookService} from "./address/address-book.service";
import {NewParcelComponent} from "./parcel/new-parcel/new-parcel.component";
import {ParcelBasketService} from "./parcel/parcel-basket.service";
import {ParcelBasketComponent} from "./parcel/parcel-basket/parcel-basket.component";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {ParcelUiComponent} from './parcel/parcel-ui/parcel-ui.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {AddressModule} from './address/address.module';

@NgModule({
    imports: [
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
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        AddressModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        ParcelBasketComponent,
        NewParcelComponent,
        ParcelUiComponent,
        TopBarComponent
    ],
    bootstrap: [AppComponent],
    providers: [ParcelBasketService, AddressBookService]
})
export class AppModule {
}
