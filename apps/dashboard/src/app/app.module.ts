import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomCheckboxModule } from './custom-checkbox/custom-checkbox.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardTileModule } from './dashboard-tile/dashboard-tile.module';
import { DemoModule } from './demo/demo.module';
import { DashboardLibModule } from '@flight-workspace/dashboard-lib';
import { DashboardTileComponent } from './dashboard-tile/dashboard-tile.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' }),
    DemoModule,
    CustomCheckboxModule,
    DashboardTileModule,
    DashboardLibModule
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent, DashboardPageComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const tileElm = createCustomElement(DashboardTileComponent, { injector: this.injector });
    customElements.define('dashboard-tile', tileElm);
  }
}
