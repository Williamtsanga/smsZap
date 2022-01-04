import { Component, OnInit,  } from '@angular/core';
import { UserService } from './services/user.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SMSZAP';
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
}