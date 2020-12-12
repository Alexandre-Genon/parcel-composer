import {Component, OnInit, Output,EventEmitter} from "@angular/core";
import { ParcelBasketService } from "../parcel-basket.service";
import * as FileSaver from "file-saver";
import * as iconv from "iconv-lite";

@Component({
  selector: "app-parcel-basket",
  templateUrl: "./parcel-basket.component.html",
  styleUrls: ["./parcel-basket.component.css"]
})
export class ParcelBasketComponent implements OnInit {
  parcels;
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
    let parcelsAsCSV =
        this.parcelBasketService
            .commitBasket()
            .map(s=>iconv.encode(s,"ISO-8859-1"));
    let parcelsAsBlob: Blob = new Blob(parcelsAsCSV,{type:"text/csv;charset=ISO-8859-1"});
    FileSaver.saveAs(parcelsAsBlob,"parcels.csv");
  }
}
