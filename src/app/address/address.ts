export class Address {
  static NB_AND_STRING_REGEX = /\s*([0-9]+[a-z,A-Z]*)?,?\s*(.+?),?\s*([0-9]+[a-z,A-Z]*)?\s*$/;
  static HAS_NUMBER_REGEX = /\d/
  static NB_AND_LETTER = /([0-9]+)([a-z,A-Z]*)/;
  static EMAIL_REGEX = /([\w-\.]+@[\w-]+\.+[\w-]+)/
  originalString: string;
  name: string;
  street: string;
  street_nb: number;
  postboxLetter: string;
  city: string;
  postcode: number;
  email: string;

  private static getTrimmedRowIfPresent(array: any[], index: number) {
      let row = (array.length >= index + 1 ? array[index] : "") as string;
      return row && row.trim();
  }

  static getStringAndNumber(composedString: string) {
    let parsedAddress = composedString.match(this.NB_AND_STRING_REGEX);
    console.log(parsedAddress);
    let stringPart = this.getTrimmedRowIfPresent(parsedAddress, 2);
    let firstPartOfRegex = this.getTrimmedRowIfPresent(parsedAddress, 1);
    var numberPart;
    if (firstPartOfRegex && firstPartOfRegex.length >= 1) {
      numberPart = parsedAddress[1];
    } else {
      numberPart = parsedAddress[3];
    }
    return [stringPart, numberPart];
  }

  static getNumberAndLetters(composedString: string) {
    let parsedNb = composedString.match(this.NB_AND_LETTER);
    let numberPart = parsedNb[1];
    let letterPart = this.getTrimmedRowIfPresent(parsedNb, 2);
    return [numberPart, letterPart];
  }

  static fromString(originalString: string): Address {
    let lines:string[] = originalString.split(/\r\n|\r|\n/);
    let nl = lines.length;
    let address = new Address();
    address.originalString = originalString;
    console.log("Parsing : "+originalString);
    for(let line of lines){
        line = line.trim();
        console.log("Line examined: #"+line+"#");
        if(line.match(this.EMAIL_REGEX) && !address.email){
            console.log("This is an email");
            address.email = line.match(this.EMAIL_REGEX)[0];
        } else if (line.match(this.HAS_NUMBER_REGEX) && !address.street){
            console.log("This is the street line");
            let streetAndNb = this.getStringAndNumber(line);
            address.street = this.getTrimmedRowIfPresent(streetAndNb,0);
            let nbAndPostbox = this.getNumberAndLetters(this.getTrimmedRowIfPresent(streetAndNb,1))
            address.street_nb = +(this.getTrimmedRowIfPresent(nbAndPostbox,0));
            address.postboxLetter = this.getTrimmedRowIfPresent(nbAndPostbox,1);
        } else if (line.match(this.HAS_NUMBER_REGEX) && address.street && !address.city) {
            console.log("This is the city line");
            let cityAndPostcode = this.getStringAndNumber(line);
            address.city = this.getTrimmedRowIfPresent(cityAndPostcode,0);
            address.postcode = +this.getTrimmedRowIfPresent(cityAndPostcode,1);
        } else if(!address.name){
            console.log("This is the name");
            address.name = line;
        }
    }
    return address;
  }

  static fromObject(obj): Address {
    let a = new Address();
    a.originalString = obj.originalString;
    a.name = obj.name;
    a.street = obj.street;
    a.street_nb = obj.street_nb;
    a.postboxLetter = obj.postboxLetter;
    a.city = obj.city;
    a.postcode = obj.postcode;
    a.email = obj.email;
    return a;
  }

  constructor(){
      // Has to support the case where email is not provided
      this.email='';
  }

  postAddressToString():string{
      return `${this.street}, ${this.street_nb}${this.postboxLetter} - ${this.postcode} ${this.city}`
  }
}
