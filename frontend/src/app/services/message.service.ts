import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageInterface} from '../message-interface'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json '
  })
}

const ELEMENT_DATA: MessageInterface[] = [
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '12-04-2021'},
  {to: 67898765678, content: ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit inorum.', date: '13-08-2022'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},

];

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = '';

  constructor(private http:HttpClient) { }

  getMessages(){

    const url = `/api/messages/all`;
    return this.http.get(url);

  }

  sendMessage(message: MessageInterface){

    const url = `/api/messages/send`;
    return this.http.post(url,
       {"message": message.content, 
       "contact": message.to,
       }, httpOptions);

  }
}
