import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import keycloakConfig from '../config/keycloak-config';

@Injectable({
  providedIn: 'root'
})
export class KeycloakUserService {
  constructor(private keycloakService: KeycloakService) { }

  async initKeycloak() {
    try {
      await this.keycloakService.init({
        config: keycloakConfig,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: true
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets', '/clients/public']
      });
    } catch (error) {
      console.error('Keycloak initialization failed', error);
    }
  }


  isLoggedIn(): boolean {
    const token = this.keycloakService.getToken();    
    return this.keycloakService.isLoggedIn();
  }





  login() {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }

}
