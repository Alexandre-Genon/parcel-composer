import {Component, OnInit, Output,EventEmitter} from "@angular/core";
import { ParcelBasketService } from "../parcel-basket.service";


@Component({
  selector: "app-parcel-basket",
  templateUrl: "./parcel-basket.component.html",
  styleUrls: ["./parcel-basket.component.css"]
})
export class ParcelBasketComponent implements OnInit {
  parcels;
  parcelsAsCSV = [];
  @Output() parcelBasketUpdated = new EventEmitter<number>();

  constructor(private parcelBasketService: ParcelBasketService) {}

  ngOnInit() {
    this.parcels = this.parcelBasketService.listBasket();
  }

  removeAddress(name:string){
      console.log("Removing "+name+" from basket")
      this.parcelBasketService.removeAddressFromBasket(name);
      this.parcels = this.parcelBasketService.listBasket();
      this.parcelBasketUpdated.emit(this.parcelBasketService.basketSize());
  }

  export() {
    this.parcelsAsCSV = this.parcelBasketService.commitBasket();
  }
}
