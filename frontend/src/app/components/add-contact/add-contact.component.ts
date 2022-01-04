import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../services/contact.service'
import { ContactInterface } from '../../contact-interface'
import {Router} from "@angular/router"



@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  name: string;
  phone_number: string;
  contact: ContactInterface = {
    name: '',
    phone_number: 0
  };


  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
  }

  addcontact(event: Event){
    if(!this.name){
      alert('Please add a Name');
      return;
    }
    if(!this.phone_number){
      alert('Please add a Phone Number');
      return;
    }
    
    this.contact.name = this.name;
    this.contact.phone_number = Number(this.phone_number);
    this.contactService.addContact(this.contact).subscribe((contact) => {console.log(contact)})
    alert('Name: ' + this.contact.name + ' Phone Number: ' + this.contact.phone_number + ' Successfully added');

    this.name = '';
    this.phone_number = '';
    this.router.navigate(['']);
  }
}
