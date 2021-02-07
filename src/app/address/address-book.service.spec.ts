import {AddressBookService} from "./address-book.service";
import {Address} from "./address";
import {TestBed} from "@angular/core/testing";

describe('AddressBookService', () => {
        let testAddress: string = `Genon Alexandre
        Rue des Foyans,   45
        6687 Bertogne,
        alexandre.genon@gmail.com.
        `;
        let testAddressReshuffled: string = `alexandre242.genon53@gmail2.com
        Rue des Foyans, 45
        Genon Alexandre
        6687 Bertogne
        `;
        let testAddressNoEmail: string = `Rue des Foyans, 45
        Genon Alexandre
        6687 Bertogne
        `;
        let addressService: AddressBookService;
        beforeEach(() => {
            TestBed.configureTestingModule({providers: [AddressBookService]});
            addressService = TestBed.inject(AddressBookService);
        });

        it("#extractAddressFromString should correctly extract address", () => {
                let address: Address = addressService.extractAddressFromString(testAddress);
                console.log(address);
                expect(address.name).toBe('Genon Alexandre');
                expect(address.email).toBe('alexandre.genon@gmail.com');
                expect(address.street).toBe('Rue des Foyans');
                expect(address.street_nb).toBe(45);
                expect(address.city).toBe('Bertogne');
            }
        );
        it("#extractAddressFromString should correctly extract address from a reshuffled address", () => {
                let address: Address = addressService.extractAddressFromString(testAddressReshuffled);
                console.log(address);
                expect(address.name).toBe('Genon Alexandre');
                expect(address.email).toBe('alexandre242.genon53@gmail2.com');
                expect(address.street).toBe('Rue des Foyans');
                expect(address.city).toBe('Bertogne');
            }
        );
        it("#extractAddressFromString should correctly extract address without email", () => {
                let address: Address = addressService.extractAddressFromString(testAddressNoEmail);
                console.log(address);
                expect(address.name).toBe('Genon Alexandre');
                expect(address.email).toBeFalsy();
                expect(address.street).toBe('Rue des Foyans');
                expect(address.city).toBe('Bertogne');
            }
        );
        it("should correctly retrieve the address", () => {
            let address: Address = addressService.extractAddressFromString(testAddress);
            console.log(address);
            addressService.upsertAddress(address);
            let foundAddress = addressService.searchByName("genon");
            expect(foundAddress.length).toBeGreaterThan(0);
            expect(foundAddress[0].name).toBe('Genon Alexandre');
        })
    }
)