import {Address} from "../address/address";

class GeoCoord{
    public lat: number;
    public lon: number;
    constructor(lat:number,lon:number) {
        this.lat=lat;
        this.lon=lon;
    }
}

export class CustomerOnMap {
    public addressFromBook : Address;
    public addressOnMap?: GeoCoord;
    public postAddressAsKey: string;

    constructor(address?: Address, lat?: number, lon?: number) {
        if(address) {
            this.addressFromBook = address;
            this.postAddressAsKey = address.postAddressToString();
        }
        if(lat && lon){
            this.addressOnMap = new GeoCoord(lat,lon);
        }
    }

}
