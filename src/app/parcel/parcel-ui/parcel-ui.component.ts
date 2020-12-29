import {Component, OnInit} from '@angular/core';
import {ParcelBasketService} from "../parcel-basket.service";

@Component({
    selector: 'app-parcel-ui',
    templateUrl: './parcel-ui.component.html',
    styleUrls: ['./parcel-ui.component.css']
})
export class ParcelUiComponent implements OnInit {
    basketSize=0;

    constructor(private parcelBasketService:ParcelBasketService){
    }
    ngOnInit(): void {
    }

    parcelBasketUpdated(basketSize: number) {
        this.basketSize = basketSize;
    }

}
