import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    }

    this.router.navigate(['/landing']);
    return false;
  }
}

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.oauthService.hasValidAccessToken()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}

