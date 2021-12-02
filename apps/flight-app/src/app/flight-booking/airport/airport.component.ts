import { Component, OnDestroy, OnInit } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';
import { Observable, Observer, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  airports: string[] = [];

  // 1. observable
  airports$: Observable<string[]>;

  // 2. subscription & unsubscription
  airportsSubscription: Subscription;

  // 3. subscriber
  airportObserver: Observer<string[]>;

  // 4. async pipe instead of subscription

  constructor(private airportService: AirportService) {}

  ngOnInit(): void {
    /*this.airportService.findAll().subscribe((airports) => {
      this.airports = airports;
    });*/

    // 1. observable
    // this.airports$ = this.airportService.findAll();

    // 2. subscription & unsubscription
    /*this.airportsSubscription = this.airports$.subscribe((airports) => {
      this.airports = airports;
    });*/

    // 3. subscriber
    /*this.airports$ = this.airportService.findAll();

    this.airportObserver = {
      next: (airports) => this.onFoundAllSuccessfully(airports),
      error: (error) => this.onFindError(error),
      complete: () => console.log('subscription completed')
    };

    this.airportsSubscription = this.airports$.subscribe(this.airportObserver);*/

    // 4. async pipe instead of subscription
    this.airports$ = this.airportService.findAll().pipe(
      delay(3000)
      // map((airports) => [])
    );
  }

  /*ngOnDestroy(): void {
    if (this.airportsSubscription) {
      this.airportsSubscription.unsubscribe();
    }
  }

  private onFoundAllSuccessfully(airports: string[]): void {
    console.log('success');
    this.airports = airports;
  }

  private onFindError(error: any): void {
    console.log('subscription error');
    console.error(error);
  }*/
}
