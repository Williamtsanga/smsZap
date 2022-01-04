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

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '';

  constructor(private http:HttpClient) { }

  getContacts(): Observable<ContactInterface[]> {
    const contacts = of(ELEMENT_DATA);
    return contacts;
  }

  addContact(contact: ContactInterface): Observable<ContactInterface>{
    const addedContact = of(contact);
    return addedContact;
  }

  deleteContact(contact: ContactInterface): Observable<ContactInterface>{
    const deletedContact = of(contact);
    return deletedContact;
  }
}
