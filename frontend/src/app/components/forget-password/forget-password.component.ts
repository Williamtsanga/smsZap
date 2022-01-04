import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PasswordInterface } from '../../password-interface';
import {Router} from "@angular/router"

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent implements OnInit {

  username: string = '';
  email: string = '';
  user: PasswordInterface = {
    username: '',
    email: ''
  };
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  ForgetPassword(event: Event){
    if(!this.username){
      alert('Please Enter Username');
      return;
    }

    if(!this.email){
      alert('Please Enter emaail');
      return;
    }

    this.user.username = this.username;
    this.user.email = this.email;
    this.userService.ForgetPassword(this.user).subscribe((user) => {console.log(user.username)});
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
