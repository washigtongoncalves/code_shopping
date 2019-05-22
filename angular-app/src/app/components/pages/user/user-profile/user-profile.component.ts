import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: UserInterface;

  constructor(private authService: AuthService) {
    this.user = this.authService.me;
  }

  ngOnInit() {

  }
}
