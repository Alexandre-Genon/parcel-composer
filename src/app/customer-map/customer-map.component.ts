import {Component, OnInit} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {CustomersMapService} from "./customers-map.service";
import {Subscription} from "rxjs";
import {catchError, concatAll, filter, map} from "rxjs/operators";

@Component({
    selector: 'app-customer-map',
    templateUrl: './customer-map.component.html',
    styleUrls: ['./customer-map.component.css']
})
export class CustomerMapComponent implements OnInit {
    private map: Map;
    private customersLayer: VectorLayer;
    private home: any;
    private customerOnMapObservable: Subscription;

    constructor(private customersMapService: CustomersMapService) {
        this.home = olProj.fromLonLat([5.66418614894541, 50.044368607736594]);
    }

    ngOnInit(): void {

        this.customersLayer = new VectorLayer({
            source: new VectorSource({
                features: []
            })
        });
        this.map = new Map({
            target: 'customers_map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: this.home,
                zoom: 7
            })
        });
        this.map.addLayer(this.customersLayer);

        this.customerOnMapObservable = this.customersMapService
            .coordFromAddresses()
            .pipe(
                filter(x => !!x === true),
                map(c=>c.addressOnMap),
                filter(x => !!x === true),
                map(aom => olProj.fromLonLat([aom.lon,aom.lat])),
                map (olproj => new Point(olproj) ),
                map (point => new Feature({
                    geometry: point
                }))
            )
            .subscribe((feature) => {
                this.customersLayer.getSource().addFeature(feature);
            });
    }

    ngOnDestroy(){
        this.customerOnMapObservable.unsubscribe();
    }

    clearCache() {
        this.customersMapService.clearCache();
    }
}
