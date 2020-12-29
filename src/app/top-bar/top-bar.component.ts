import {Component, OnInit} from '@angular/core';
import {routes} from '../app-routing.module';
import {routes as addressRoutes} from '../address/address-routing.module'

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    getNavLink(): string[] {
        let allRoutes = routes.concat(addressRoutes);
        return allRoutes.map(r => r.path);
    }

}
