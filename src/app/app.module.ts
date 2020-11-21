import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { ParcelBasketComponent } from "./parcel-basket/parcel-basket.component";
import { AddressService } from "./address.service";
import { NewParcelComponent } from "./new-parcel/new-parcel.component";
import { ParcelBasketService } from "./parcel-basket.service";
import { IdbService } from "./idb.service";
import { AdressBookComponent } from "./adress-book/adress-book.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ParcelBasketComponent,
    NewParcelComponent,
    AdressBookComponent
  ],
  bootstrap: [AppComponent],
  providers: [AddressService, ParcelBasketService, IdbService]
})
export class AppModule {}
