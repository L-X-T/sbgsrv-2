/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardTileComponent } from './dashboard-tile.component';

@NgModule({
  imports: [CommonModule, NgxChartsModule],
  declarations: [DashboardTileComponent],
  exports: [DashboardTileComponent]
})
export class DashboardTileModule {
  constructor(private injector: Injector) {
    // TODO: Wrap DashboardTileComponent as a web component and register it
  }
}
