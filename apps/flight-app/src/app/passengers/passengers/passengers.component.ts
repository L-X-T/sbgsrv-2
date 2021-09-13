import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PassengerAppState, selectAllPassengers } from '../passenger.selectors';
import { Observable } from 'rxjs';
import { Passenger } from '../passenger.model';
import { addPassengers } from '../passenger.actions';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  constructor(private store: Store<PassengerAppState>) {}

  passengers$: Observable<Passenger[]>;

  ngOnInit(): void {
    this.store.dispatch(
      addPassengers({
        passengers: [
          { id: 1, name: 'Max' },
          { id: 2, name: 'Susi' }
        ]
      })
    );

    this.passengers$ = this.store.select(selectAllPassengers);
  }
}
