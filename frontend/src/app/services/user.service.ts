import { Injectable } from '@angular/core';
import { UserInterface } from '../user-interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: UserInterface = {
    username: '',
    password: ''
  };


  constructor() { }

  logIn(user: UserInterface): Observable<UserInterface> {
   const loggedUser = of(user);
   localStorage.setItem('User', JSON.stringify(user))
   return loggedUser;
  }

  Register(user: UserInterface): Observable<UserInterface> {
    const registeredUser = of(user);
    return registeredUser;
  }

  getUser(): Observable<UserInterface> {
    
    if(localStorage.getItem('User')){
      return of(JSON.parse(localStorage.getItem('User') || '{}'));
    }
    
    return of(this.user);
  }
}
