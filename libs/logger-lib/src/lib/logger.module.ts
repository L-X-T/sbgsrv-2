/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMonitorComponent } from './log-monitor.component';
import { LoggerConfig } from './logger.config';
import { LogFormatterService } from './log-formatter.service';
import { DefaultLogFormatterService } from './default-log-formatter.service';

// imports: [ LoggerModule.forRoot({ ... }) ]

const defaultFormatterConfig = [
  {
    provide: LogFormatterService,
    useClass: DefaultLogFormatterService
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [LogMonitorComponent],
  // providers: [
  //   LoggerService
  // ],
  exports: [LogMonitorComponent]
})
export class LoggerModule {
  // Setup
  static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LoggerConfig, useValue: config },

        // This is a bit special but needed as the
        // Angular Compiler needs to statically find
        // out whats going on here ...
        !config.logFormatterType ? defaultFormatterConfig : { provide: LogFormatterService, useClass: config.logFormatterType }
      ]
    };
  }
}
