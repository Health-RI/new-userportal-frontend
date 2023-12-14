import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environment/environment';

export function initKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: environment.keyCloakrealm,
        url: environment.keyCloakUrl,
        clientId: environment.keyCloakclientId
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
    });
}


