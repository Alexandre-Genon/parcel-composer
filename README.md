# parcel-composer
This small Angular application will help building a parcel list that can then be exported as a CSV following the format that can be uploaded on bpost website. 
The main use case is use the address field to input the complete address. Each field (name, city, street,..) can then be extracted. For this to work, the input must be structured as follows :
- line 1 is name
- line 2 is street and number (in any order) 
- line 3 is city and postcode (in any order) 
- line 4 is email address. 

Once an address is added as a new parcel it is automatically saved in a local (ie local browser indexed db) address book. 
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/parcel-composer)
