import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  token:any ;
  
  constructor(
    protected override readonly router: Router,
   protected readonly keycloak: KeycloakService
 ) {
   super(router, keycloak);
   this.token = this.keycloak.getToken();
   localStorage.setItem("token",this.token?.__zone_symbol__value)
 }

 public async isAccessAllowed(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  // Force the user to log in if currently unauthenticated.
  if (!this.authenticated) {
    await this.keycloak.login({
      redirectUri:
      window.location.origin + state.url
      //'http://localhost:4200/home'
    });
  }

  // Get the roles required from the route.
  const requiredRoles = route.data['roles'];

  // Allow the user to proceed if no additional roles are required to access the route.
  if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
    return true;
  }

  // Allow the user to proceed if all the required roles are present.
  return requiredRoles.every((role) => this.roles.includes(role));
}
  
}
