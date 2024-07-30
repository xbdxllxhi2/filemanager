import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FileBrowserComponent} from './file-browser/file-browser.component';
import {ContentEditorComponent} from './content-editor/content-editor.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./AuthGuard.guard";

const routes: Routes = [
  {path: '', redirectTo: '/browser', pathMatch: 'full'},
  // {path: 'login', component: LoginComponent},
  {path: 'editor', component: ContentEditorComponent},
  {path: 'browser', component: FileBrowserComponent, canActivate: [AuthGuard]},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
