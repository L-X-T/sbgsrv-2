import { Component, OnInit } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';

@Component({
  selector: 'flight-workspace-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  airports: string[] = [];

  constructor(private airportService: AirportService) {}

  ngOnInit(): void {
    this.airportService.findAll().subscribe((airports) => {
      this.airports = airports;
    });
  }
}
