export class Address {
  static NB_AND_STRING_REGEX = /\s*([0-9]*),?\s*(.+?),?\s*([0-9]*)\s*$/;
  originalString: string;
  name: string;
  street: string;
  street_nb: number;
  postbox_letter: string;
  city: string;
  postcode: number;
  email: string;

  private static getRowIfPresent(array: any[], index: number) {
    return array.length >= index + 1 ? array[index] : "";
  }

  static getStringAndNumber(composedString: string) {
    let parsedAddress = composedString.match(this.NB_AND_STRING_REGEX);
    let stringPart = this.getRowIfPresent(parsedAddress, 2);
    var numberPart;
    if (this.getRowIfPresent(parsedAddress, 1).length >= 1) {
      numberPart = parsedAddress[1];
    } else {
      numberPart = parsedAddress[3];
    }
    return [stringPart, numberPart];
  }

  static fromString(originalString: string): Address {
    let lines = originalString.split(/\r\n|\r|\n/);
    let nl = lines.length;
    let address = new Address();
    address.originalString = originalString;
    address.name = lines[0];
    let fullStreet = this.getRowIfPresent(lines, 1);
    let streetAndNb = this.getStringAndNumber(fullStreet);
    address.street = streetAndNb[0];
    address.street_nb = streetAndNb[1];
    let fullCity = this.getRowIfPresent(lines, 2);
    let cityAndPostcode = this.getStringAndNumber(fullCity);
    address.city = cityAndPostcode[0];
    address.postcode = cityAndPostcode[1];
    address.email = this.getRowIfPresent(lines, 3);
    return address;
  }

  static fromObject(obj): Address {
    let a = new Address();
    a.originalString = obj.originalString;
    a.name = obj.name;
    a.street = obj.street;
    a.street_nb = obj.street_nb;
    a.city = obj.city;
    a.postcode = obj.postcode;
    a.email = obj.email;
    return a;
  }
}
