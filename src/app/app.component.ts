import { Component } from '@angular/core';

import { authConfig } from './auth.config';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
      constructor(
          private router: Router,
          private oauthService: OAuthService) {
  
         this.configureWithoutDiscovery();
        // this.configureWithNewConfigApi();
        
      }
  
  
      private configureWithoutDiscovery() {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.tryLogin();
      }
  
      // This api will come in the next version
      private configureWithNewConfigApi() {
  
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
  
        // Optional
        this.oauthService.setupAutomaticSilentRefresh();
  
        this.oauthService.events.subscribe(e => {
          console.debug('oauth/oidc event', e);
        });
  
        this.oauthService.events.filter(e => e.type === 'session_terminated').subscribe(e => {
          console.debug('Your session has been terminated!');
        });
        
        this.oauthService.events.filter(e => e.type === 'token_received').subscribe(e => {
          // this.oauthService.loadUserProfile();
        });
  
      }
  
  }
