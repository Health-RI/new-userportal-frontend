import { Component, OnInit } from '@angular/core';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { faUser, faRightToBracket, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userData: any;
  faUser = faUser;
  faRightToBracket = faRightToBracket;
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;


  constructor(private readonly oidcSecurityService: OidcSecurityService, private router: Router) { }

  ngOnInit() {
    this.oidcSecurityService.checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        const { isAuthenticated, userData } = loginResponse;
        this.isAuthenticated = isAuthenticated;
        this.userData = userData;
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  username() {
    return this.userData?.preferred_username;
  }

  onClickLogo(): void {
    console.log("Click logo")
    this.router.navigate(['/']);
  }
}
