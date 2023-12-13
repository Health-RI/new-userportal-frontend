import { Component } from '@angular/core';
import { KeycloakUserService } from 'src/app/services/keycloak-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private keycloakUserService: KeycloakUserService) { 
    this.checkLoginStatus();
  }

  onLoginClick() {
    this.keycloakUserService.initKeycloak().then(() => {
      this.keycloakUserService.login();
    });
  }

  onLogoutClick() {
    this.keycloakUserService.logout();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.keycloakUserService.isLoggedIn();
  }

}
