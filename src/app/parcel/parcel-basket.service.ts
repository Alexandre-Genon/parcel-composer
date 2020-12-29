import { Injectable } from "@angular/core";
import { Address } from "../address/address";
import { AddressBookService } from "../address/address-book.service";

@Injectable()
export class ParcelBasketService {
  parcelBasket: Address[] = [];

  constructor(private addressService: AddressBookService) {
      console.log("Instanciating ParcelBasketService");
  }

  addAddressToBasket(address: Address) {
    return this.parcelBasket.push(address);
  }

  removeAddressFromBasket(name: String) {
    this.parcelBasket = this.parcelBasket.filter(a => a.name != name);
  }

  listBasket() {
    return this.parcelBasket;
  }

  basketSize(){
    return this.parcelBasket.length;
  }

  exportToBPostCSV(): string[] {
      let CSVHeader  = [
          "Nom destinataire;Société destinataire;Rue destinataire;Numéro destinataire;Boîte destinataire;Code postal destinataire;Localité destinataire;Numéro téléphone destinataire;E-mail destinataire;Poids;Référence;COD;Montant COD;Compte COD;Assurance;Confirmation réception;Confirmation réception langue;Confirmation réception type;Confirmation réception données contact\n",
          "40;40;40;8;8;4;40;9;50;2;50;1;10;16;1;1;2;50;50\n",
          "*;;*;*;;*;*;;;*;;;;;;;;;\n",
          "John Smith;Smith Inc.;Kerkstraat;57;A;1000;Brussel;477789878;John.Smith@hotmail.com;2;123456789;O;392,24;BE68539007547034;O;O;EN;EMAIL;John.Smith@bpost.be\n"
          ]
      let basketAsCSV = this.parcelBasket.map(a => this.toBPostCSV(a)+"\n");

      return CSVHeader.concat(basketAsCSV);
  }

  toBPostCSV(address: Address): string {
    var asCSV =
      address.name +
      "; " + // Empty space for company
      ";" +
      address.street +
      ";" +
      address.street_nb +
      ";" +
      address.postboxLetter + 
      ";" +
      address.postcode +
      ";" +
      address.city +
      ";" +
      ";" + //empty space for phone number
      address.email +
      ";2"; // Weight
    return asCSV;
  }

  commitBasket(): string[] {
    return this.exportToBPostCSV();
  }
}
