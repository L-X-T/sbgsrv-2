/* eslint-disable no-restricted-syntax */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightCancellingService } from './flight-cancelling.service';

@Component({
  selector: 'flight-cancelling',
  templateUrl: './flight-cancelling.component.html',
  styleUrls: ['./flight-cancelling.component.css']
})
export class FlightCancellingComponent implements OnInit {
  @Input() flightId: string;
  @Output() closed = new EventEmitter();

  constructor(private service: FlightCancellingService) {}

  ngOnInit(): void {
    console.debug('init');
  }

  closeHandler(): void {
    console.debug('remove');
    this.closed.next();
  }
}
