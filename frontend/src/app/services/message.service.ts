import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageInterface} from '../message-interface'

export interface Minterface {
  _id: string;
  userId: string;
  contact: string;
  message: string;
  createdAt: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json '
  })
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = '';

  constructor(private http:HttpClient) { }

  getMessages(): Observable<Minterface[]> {

    const url = `/api/messages/all`;
    return this.http.get<Minterface[]>(url);

  }

  sendMessage(message: MessageInterface){

    const url = `/api/messages/send`;
    return this.http.post(url,
       {"message": message.content, 
       "contact": message.to,
       }, httpOptions);

  }
}
