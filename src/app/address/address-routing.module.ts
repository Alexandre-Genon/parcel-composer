import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdressBookComponent} from "./adress-book/adress-book.component";
import {AddressEditorComponent} from "./adress-book/address-editor/address-editor.component";

export const routes: Routes = [
    {path:'addresses',component:AdressBookComponent},
    {path:'address/:name',component:AddressEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
