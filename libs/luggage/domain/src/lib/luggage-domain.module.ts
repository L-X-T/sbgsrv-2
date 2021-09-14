import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuggageEffects } from './+state/luggage/luggage.effects';
import * as fromLuggage from './+state/luggage/luggage.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LossReportEffects } from './+state/loss-report/loss-report.effects';
import * as fromLossReport from './+state/loss-report/loss-report.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(fromLuggage.LUGGAGE_FEATURE_KEY, fromLuggage.reducer), EffectsModule.forFeature([LuggageEffects]), StoreModule.forFeature(fromLossReport.LOSSREPORT_FEATURE_KEY, fromLossReport.reducer), EffectsModule.forFeature([LossReportEffects])]
})
export class LuggageDomainModule {}
