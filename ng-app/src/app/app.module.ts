// src/app/app.module.ts
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CKEditorModule} from 'ckeditor4-angular';
import {AppRoutingModule} from './app-routing.module';
import {KeycloakBearerInterceptor, KeycloakService} from 'keycloak-angular';

import {AppComponent} from './app.component';
import {FileBrowserComponent} from './file-browser/file-browser.component';
import {ContentEditorComponent} from './content-editor/content-editor.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AuthGuard} from "./AuthGuard.guard";


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
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        enableLogging: true
        // flow: "standard"
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
    MatProgressSpinner,
  ],
  providers: [
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    },
    provideAnimationsAsync(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
