import { Component } from '@angular/core';
import { LoggerService } from '@flight-workspace/logger-lib';
import { AuthLibService } from '@flight-workspace/shared/auth-lib';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthLibService, private loggerService: LoggerService, private oauthService: OAuthService) {
    this.loggerService.log('log');
    this.loggerService.debug('debug');

    // this.authService.login('Alex', '');

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
