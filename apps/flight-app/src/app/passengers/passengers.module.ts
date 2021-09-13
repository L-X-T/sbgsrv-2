import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPassenger from './passenger.reducer';
import { PassengersComponent } from './passengers/passengers.component';

@NgModule({
  declarations: [PassengersComponent],
  imports: [CommonModule, StoreModule.forFeature(fromPassenger.passengersFeatureKey, fromPassenger.reducer)],
  exports: [PassengersComponent]
})
export class PassengersModule {}
