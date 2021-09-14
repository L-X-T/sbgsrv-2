import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuggageEffects } from './+state/luggage/luggage.effects';
import * as fromLuggage from './+state/luggage/luggage.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(fromLuggage.LUGGAGE_FEATURE_KEY, fromLuggage.reducer), EffectsModule.forFeature([LuggageEffects])]
})
export class LuggageDomainModule {}
