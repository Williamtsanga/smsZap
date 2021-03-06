import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from '../../user-interface';
import {Router} from "@angular/router"

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  username: string = '';
  password: string = '';
  user: UserInterface = {
    username: '',
    password: '',
    email: ''
  };
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logIn(event: Event){
    if(!this.username){
      alert('Please Enter Username');
      return;
    }

    if(!this.password){
      alert('Please Enter Password');
      return;
    }

    this.user.username = this.username;
    this.user.password = this.password;
    this.userService.logIn(this.user).subscribe((data: any) => {
      console.log(data)
      this.user.email = data.email;
      localStorage.setItem('User', JSON.stringify(this.user))});
      this.router.navigate(['']).then(() => {
      });
  }
}
