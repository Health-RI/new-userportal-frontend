import { KeycloakConfig } from "keycloak-js";


const keycloakConfig: KeycloakConfig = {
  url: 'https://healthri-keycloack-dev.azurewebsites.net/auth', 
  realm: 'master', // Replace with your realm name
  clientId: 'gdi-userportal-app' // Replace with your client ID
};

export default keycloakConfig;