import { Injectable } from '@angular/core';
import { UserInterface } from '../user-interface';
import { PasswordInterface } from '../password-interface';
import { ResetInterface } from '../reset-interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json '
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = '';

  user: UserInterface = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private http: HttpClient) { }

  logIn(user: UserInterface) {

    const url = `/api/user/login`;
    return this.http.post(url,
       {"username": user.username, 
       "password": user.password,
       }, httpOptions);
    
  }

  Reset(user: UserInterface){

    const url = `/api/passwordReset`;
    return this.http.post(url,
       {"email": user.email, 
       "password": user.password,
       }, httpOptions);

   }

  forgotPassword(user: UserInterface){

    const url = `/api/passwordReset`;
    return this.http.post(url,
       {"username": user.username, 
       "password": user.password,
       }, httpOptions);
   }

  Register(user: UserInterface) {

    const url = `/api/user/register`;
    return this.http.post(url,
       {"username": user.username, 
       "password": user.password,
       "email": user.email,
       "phone": user.phone}, httpOptions);
  
  }

  getUser(){
    
    if(localStorage.getItem('User')){
      return of(JSON.parse(localStorage.getItem('User') || '{}'));
    }
    
    return of(this.user);
  }
}
