import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthLibService } from '@flight-workspace/shared/auth-lib';
import { OAuthModule } from 'angular-oauth2-oidc';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'passenger',
    pathMatch: 'full'
  },
  {
    path: 'passenger',
    loadChildren: () => import('./passenger/passenger.module').then((esm) => esm.PassengerModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes), OAuthModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
