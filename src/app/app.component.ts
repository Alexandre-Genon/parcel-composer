import { Component, VERSION } from "@angular/core";
import {ParcelBasketService} from "./parcel/parcel-basket.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
    basketSize=0;

    constructor(private parcelBasketService:ParcelBasketService){

    }

    parcelBasketUpdated(basketSize: number) {
        this.basketSize=basketSize;
    }
}
