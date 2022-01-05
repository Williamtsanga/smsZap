import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service'
import { UserInterface } from '../../user-interface'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() user: any;
  showusername: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((data: any) => {
      console.log(data);
      this.user = data.username;
      if(data.username.length != 0) {
        this.showusername = true;
    }
    });
  }

}
