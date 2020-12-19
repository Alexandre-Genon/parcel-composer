import {Component, OnInit} from '@angular/core';
import {AddressBookService} from "../../address-book.service";

enum UploadMode{
    RESET_EXISTING,
    NO_DUPLICATE,
    INSERT
}

@Component({
    selector: 'app-address-book-uploader',
    templateUrl: './address-book-uploader.component.html',
    styleUrls: ['./address-book-uploader.component.css']
})
export class AddressBookUploaderComponent implements OnInit {
    sourceFile: File;
    uploadModes=UploadMode;
    uploadModeKeys;
    selectedUploadMode;

    constructor(private addressService:AddressBookService) {
        this.uploadModeKeys = Object.keys(this.uploadModes).filter(f=>(!isNaN(Number(f))));
        console.log(this.uploadModeKeys);
        console.log(this.uploadModes);
    }

    ngOnInit(): void {
    }

    onFileChange(event: Event) {
        this.sourceFile = (event.target as HTMLInputElement).files[0];
    }

    startUpload(event: MouseEvent) {
        let fileReader: FileReader = new FileReader();

        fileReader.onloadend = (event => {
            if(fileReader.result != null && typeof fileReader.result == "string"){
                let fileContent:string = fileReader.result;
                let addressesAsJson = JSON.parse(fileContent);
                console.log(this.selectedUploadMode);
                if(this.selectedUploadMode===UploadMode.RESET_EXISTING){
                    this.addressService.truncateBook();
                }
                addressesAsJson.forEach(addressAsJson => {
                    this.addressService.addAddress(addressAsJson);
                })
            }
        });
        fileReader.readAsText(this.sourceFile);
    }
}
