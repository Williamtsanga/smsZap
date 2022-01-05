import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ContactService } from '../../services/contact.service';
import { ContactInterface } from '../../contact-interface'
import {MessageInterface} from '../../message-interface'
import {Router} from "@angular/router"

export interface Cinterface {
  name: string;
  phone: string;
}


@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  contact: Cinterface;
  content: string = '';
  contacts: Cinterface[] = [];
  message: MessageInterface = {
    to: '0',
    content: '',
    date: '',
  };

  constructor(private contactService: ContactService, private messageService: MessageService,  private router: Router) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((data) => {console.log(data)
    this.contacts = data})
  }

  sendMessage(event: Event): void {


    if(!this.contact){
      alert('Please Select a Contact');
      return;
    }

    if(!this.content){
      alert('Please Enter Message');
      return;
    }
    
    var today = new Date();
    this.message.to = this.contact.phone;
    this.message.content = this.content
    this.message.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.messageService.sendMessage(this.message).subscribe((data) => {console.log(data)})

    this.content = '';
    this.contactService.getContacts().subscribe((data) => {console.log(data)})
    alert('sms has been sent to '+this.message.to);
    this.router.navigate(['messages']);

  }

}
