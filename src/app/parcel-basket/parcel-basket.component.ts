import { Component, OnInit } from "@angular/core";
import { ParcelBasketService } from "../parcel-basket.service";

@Component({
  selector: "app-parcel-basket",
  templateUrl: "./parcel-basket.component.html",
  styleUrls: ["./parcel-basket.component.css"]
})
export class ParcelBasketComponent implements OnInit {
  parcels;
  parcelsAsCSV = [];
  constructor(private parcelBasketService: ParcelBasketService) {}

  ngOnInit() {
    this.parcels = this.parcelBasketService.listBasket();
  }

  export() {
    this.parcelsAsCSV = this.parcelBasketService.commitBasket();
  }
}
