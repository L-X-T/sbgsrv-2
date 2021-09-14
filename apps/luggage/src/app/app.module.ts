import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    HttpClientModule,
    // LuggageFeatureCheckinModule,
    // LuggageFeatureReportLossModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'check-in'
      },
      {
        path: 'check-in',
        loadChildren: () => import('@flight-workspace/luggage/feature-checkin').then((m) => m.LuggageFeatureCheckinModule)
      },
      {
        path: 'report-loss',
        loadChildren: () => import('@flight-workspace/luggage/feature-report-loss').then((m) => m.LuggageFeatureReportLossModule)
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
