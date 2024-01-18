import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { environment } from 'src/environment/environment';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: environment.identityServerUrl,
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: environment.identityServerClientId,
            scope: 'openid profile email offline_access',
            responseType: 'code',
            silentRenew: true,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            renewTimeBeforeTokenExpiresInSeconds: 10,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
