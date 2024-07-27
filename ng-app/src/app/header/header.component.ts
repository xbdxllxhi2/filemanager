import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: any;

  constructor(private router: Router, private keycloak: KeycloakService) {
  }

  ngOnInit() {
  }

  logout() {
    this.keycloak.logout();
  }

}
