import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { AppComponent } from "./app.component";
import { AddressBookService } from "./address/address-book.service";
import { AdressBookComponent } from "./address/adress-book/adress-book.component";
import { NewParcelComponent } from "./parcel/new-parcel/new-parcel.component";
import { ParcelBasketService } from "./parcel/parcel-basket.service";
import { ParcelBasketComponent } from "./parcel/parcel-basket/parcel-basket.component";


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
    ParcelBasketComponent,
    NewParcelComponent,
    AdressBookComponent
  ],
  bootstrap: [AppComponent],
  providers: [ParcelBasketService,AddressBookService]
})
export class AppModule {}
