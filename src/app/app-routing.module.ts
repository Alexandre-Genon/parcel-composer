import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ParcelBasketComponent} from "./parcel/parcel-basket/parcel-basket.component";
import {ParcelUiComponent} from "./parcel/parcel-ui/parcel-ui.component";

export const routes: Routes = [
    {path: 'new_parcel', component: ParcelUiComponent },
    {path: 'parcels', component: ParcelBasketComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
