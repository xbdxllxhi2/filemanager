import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'

import {AppComponent} from './app.component';
import {FileBrowserComponent} from './file-browser/file-browser.component';
import {HttpClientModule} from '@angular/common/http';
import {CKEditorModule} from 'ckeditor4-angular';
import {ContentEditorComponent} from './content-editor/content-editor.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component'
import {KeycloakService} from "keycloak-angular";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8085',
        realm: 'clavis-admin',
        clientId: 'clavis-backend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
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
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
