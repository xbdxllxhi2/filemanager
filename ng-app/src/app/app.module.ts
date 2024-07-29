// src/app/app.module.ts
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CKEditorModule} from 'ckeditor4-angular';
import {AppRoutingModule} from './app-routing.module';
import {KeycloakService} from 'keycloak-angular';

import {AppComponent} from './app.component';
import {FileBrowserComponent} from './file-browser/file-browser.component';
import {ContentEditorComponent} from './content-editor/content-editor.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8085',
        realm: 'clavis-admin',
        clientId: 'clavis-front'
      }
      ,
      initOptions: {
        onLoad: 'login-required',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html'
        flow: "standard"
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    FileBrowserComponent,
    ContentEditorComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    },
    provideAnimationsAsync(),
    // AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
