import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthzServiceService {

  constructor(private keycloak: KeycloakService) {
  }

  currentUserHasRoleModerator(): boolean {
    return this.keycloak.isUserInRole(environment.moderator_role);
  }
}
