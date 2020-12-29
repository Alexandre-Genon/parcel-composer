import {AddressBookService} from "./address-book.service";
import {Address} from "./address";

describe('AddressBookService', () => {
        let testAddress: string = `Genon Alexandre
        Rue des Foyans, 45
        6687 Bertogne
        alexandre.genon@gmail.com
        `
        let addressService: AddressBookService;
        beforeEach(() => {
            addressService = new AddressBookService()
        });

        it("#extractAddressFromString should correctly extract address", () => {
                let address: Address = addressService.extractAddressFromString(testAddress);
                expect(address.name).toBe('Genon Alexandre');
                expect(address.email).toBe('alexandre.genon@gmail.com');
                expect(address.street).toBe('Rue des Foyans');
                expect(address.city).toBe('Bertogne');
            }
        );
        it("should correctly retrieve the address",()=>{
            let address: Address = addressService.extractAddressFromString(testAddress);
            addressService.addAddress(address);
            let foundAddress = addressService.searchByName("genon");
            expect(foundAddress.length).toBeGreaterThan(0);
            expect(foundAddress[0].name).toBe('Genon Alexandre');
        })
    }
)