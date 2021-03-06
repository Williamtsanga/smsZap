import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../user-interface';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username : string= '';
  password: string = '';
  password2: string = '';
  email: string = '';
  user: UserInterface = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  Register(event: Event) {
    if(!this.username){
      alert('Please Enter Username');
      return;
    }

    if(!this.password){
      alert('Please Enter Password');
      return;
    }

    if(!this.password2){
      alert('Please Enter Password');
      return;
    }   

    if(!this.email){
      alert('Please Enter Email');
      return;
    }

    if(this.password != this.password2){
      alert('Password1 and Password2 must be thesame');
      return;
    }

    this.user.username = this.username;
    this.user.email = this.email;
    this.user.password = this.password;
    this.userService.Register(this.user).subscribe((data) => {
      console.log(data);
      localStorage.setItem('User', JSON.stringify(data))
    });
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
    
  }

}
