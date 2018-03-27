// This api will come in the next version

import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  //issuer: 'https://steyer-identity-server.azurewebsites.net/identity',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/home', // /index.html

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'b6a6767945fca380cf97ba72c6d98ff67e04471c30b3428ef090a83d658aa915',

  loginUrl: "https://git.informatik.uni-hamburg.de/oauth/authorize",
  tokenEndpoint: "https://git.informatik.uni-hamburg.de/oauth/token",

  oidc: false,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'api',

  showDebugInformation: true,

  sessionChecksEnabled: true
}
