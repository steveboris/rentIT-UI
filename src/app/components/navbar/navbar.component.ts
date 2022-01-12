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
    this.username = "User";
  }

  ngOnInit(): void {
    this.checkUserAuthState();
  }

  private checkUserAuthState() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  Signout() {
    this.authService.doLogout();
  }
}
