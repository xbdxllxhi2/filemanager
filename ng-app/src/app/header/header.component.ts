import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {KeycloakService} from "keycloak-angular";
import {UserModel} from "../models/user-model";
import {AuthzServiceService} from "../services/authz/authz-service.service";
import {Authorizable} from "../utils/authorizable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, Authorizable {
  @Input() user: UserModel;

  constructor(private router: Router, private keycloak: KeycloakService,
              private authzService: AuthzServiceService) {
  }

  ngOnInit() {
  }

  logout() {
    this.keycloak.logout();
  }

  isModerator(): boolean {
    return this.authzService.currentUserHasRoleModerator();
  }
}
