import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router"
import { UserInterface } from 'src/app/user-interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetComponent implements OnInit {

  
  password: string = '';
  email: string ='';
  user: UserInterface = {
    username: '',
    password: '',
    email: ''
  };
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  Reset(event: Event){
    if(!this.password){
      alert('Please Enter Password');
      return;
    }
    if(!this.email){
      alert('Please Enter email');
      return;
    }

    this.user.email = this.email;
    this.user.password = this.password;
    this.userService.Reset(this.user).subscribe((data) => {console.log(data)});
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
