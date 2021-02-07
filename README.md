# parcel-composer
This small Angular application will help building a parcel list that can then be exported as a CSV following the format that can be uploaded on [BPost]( https://parcel.bpost.be/fr/upload-bulk-labels) website. 
The main use case is use the address field to input the complete address. Each field (name, city, street,..) can then be extracted. For this to work, the input must be structured as follows :
- first line matching a number and some text is street and number (in any order) 
- second line matching a number and some text is city and postcode (in any order) 
- a line matching a email pattern is the email address. 
- line matching none of the above is the name

Once an address is added as a new parcel it is automatically saved in a local (ie local browser indexed db) address book. 
