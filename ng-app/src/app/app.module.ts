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
import {AuthGuard} from "./AuthGuard.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

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
    AppRoutingModule
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    },
    // AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
