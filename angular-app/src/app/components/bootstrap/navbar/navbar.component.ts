import { Component, OnInit, Input } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('app-title')
  appTitle: string;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  logout() {
    this.authService
        .logout()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
  }
}
