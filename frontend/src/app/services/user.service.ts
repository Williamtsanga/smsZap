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

  private apiUrl = 'http://localhost:4300';

  user: UserInterface = {
    username: '',
    password: ''
  };
  user1: PasswordInterface = {
    username: '',
    email: ''
  };
  user2: ResetInterface = {
    
    password: '',
    email: ''
  };


  constructor(private http: HttpClient) { }

  logIn(user: UserInterface) {

    const url = `${this.apiUrl}/api/login`;
    this.http.post(url,
       {"username": user.username, 
       "password": user.password,
       }, httpOptions);
    
   const loggedUser = of(user);
   return loggedUser;
  }

  Reset(user: ResetInterface): Observable<ResetInterface> {
    const loggedUser = of(user);
    localStorage.setItem('User', JSON.stringify(user))
    return loggedUser;
   }

  ForgetPassword(user1: PasswordInterface): Observable<PasswordInterface> {
    const loggedUser = of(user1);
    localStorage.setItem('User1', JSON.stringify(user1))
    return loggedUser;
   }

  Register(user: UserInterface) {

    const url = `${this.apiUrl}/api/register`;
    this.http.post(url,
       {"username": user.username, 
       "password": user.password,
       "email": user.email,
       "phone": user.phone}, httpOptions);
    
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
