import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router"
import { UserInterface } from 'src/app/user-interface';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent implements OnInit {

  username: string = '';
  email: string = '';
  user: UserInterface = {
    username: '',
    email: '',
    password: ''
  };
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword(event: Event){
    if(!this.username){
      alert('Please Enter Username');
      return;
    }

    if(!this.email){
      alert('Please Enter Emaail');
      return;
    }

    this.user.username = this.username;
    this.user.email = this.email;
    this.userService.forgotPassword(this.user).subscribe((data) => {console.log(data)});
    this.router.navigate(['reset-password']).then(() => {
      window.location.reload();
    });
  }
}
