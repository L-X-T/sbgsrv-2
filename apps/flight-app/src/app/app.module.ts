import { FlightCancellingModule } from './flight-booking/flight-cancelling/flight-cancelling.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FlightLibModule } from '@flight-workspace/flight-lib';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoggerModule } from '@flight-workspace/logger-lib';
import { CustomLogFormatterService } from './shared/logging/custom-log-formatter.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightLookaheadComponent } from './flight-lookahead/flight-lookahead.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { PassengersModule } from './passengers/passengers.module';
import { OAuthModule } from 'angular-oauth2-oidc';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeDeAt from '@angular/common/locales/de-AT';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeDe); // de-DE
registerLocaleData(localeDeAt); // de-AT
registerLocaleData(localeEn); // en-US

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    // FlightBookingModule,

    BrowserAnimationsModule,
    FlightCancellingModule,
    PassengersModule,

    FlightLibModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules }),

    LoggerModule.forRoot({ enableDebug: true, logFormatterType: CustomLogFormatterService }),

    ReactiveFormsModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: 'router', routerState: RouterState.Minimal }),
    EffectsModule.forRoot([]),

    OAuthModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent, BasketComponent, FlightLookaheadComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
