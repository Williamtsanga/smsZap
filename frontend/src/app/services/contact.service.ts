import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactInterface } from '../contact-interface'
 

const ELEMENT_DATA: ContactInterface[] = [
  {name: 'Thomas', phone_number: +237499493},
  {name: 'Brain', phone_number: 65456789},
  {name: 'Lacose', phone_number: 876545678},
  {name: 'Aerly', phone_number: 3455437657},
  {name: 'Thomas', phone_number: 933499493},
  {name: 'Brain', phone_number: 65456789},
  {name: 'Lacose', phone_number: 876545678},
  {name: 'Aerly', phone_number: 3455437657},
  {name: 'Thomas', phone_number: 933499493},
  {name: 'Brain', phone_number: 65456789},
  {name: 'Lacose', phone_number: 876545678},
  {name: 'Aerly', phone_number: 3455437657},
  {name: 'Thomas', phone_number: 933499493},
  {name: 'Brain', phone_number: 65456789},
  {name: 'Lacose', phone_number: 876545678},
  {name: 'Aerly', phone_number: 3455437657},
];
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json '
  })
}
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '';

  constructor(private http:HttpClient) { }

  getContacts(){

    const url = `${this.apiUrl}/api/contacts/getAll`;
    return this.http.get(url);

  }

  addContact(contact: ContactInterface) {

    const url = `${this.apiUrl}/api/contacts/add`;
    return this.http.post(url,
       {"name": contact.name, 
       "phone": contact.phone_number,
       }, httpOptions);
  }

  deleteContact(contact: ContactInterface): Observable<ContactInterface>{
    const deletedContact = of(contact);
    return deletedContact;
  }
}
