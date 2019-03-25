import { Component, OnInit, Input } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input('app-title')
  appTitle: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {}
}
