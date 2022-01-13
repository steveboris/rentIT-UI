import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn = false;
    this.username = '';
  }

  ngOnInit(): void {
    this.checkUserAuthState();
  }

  private checkUserAuthState() {
    this.isLoggedIn = this.authService.isLoggedIn;
    // read also the current connected user
    if(this.isLoggedIn) {
      this.username = localStorage.getItem('email');
    }
  }

  Signout() {
    this.authService.doLogout();
  }
}
