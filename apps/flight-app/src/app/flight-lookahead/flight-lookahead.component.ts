import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, filter, map, pairwise, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css']
})
export class FlightLookaheadComponent implements OnInit {
  control: FormControl;
  flights$: Observable<Flight[]>;
  diff$: Observable<number>;
  loading: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.control = new FormControl();

    this.flights$ = this.control.valueChanges.pipe(
      debounceTime(300),
      filter((input) => input.length > 2),
      distinctUntilChanged(),
      tap((input) => (this.loading = true)),
      switchMap((input) => this.load(input)),
      tap((v) => (this.loading = false))
    );

    this.diff$ = this.flights$.pipe(
      pairwise(),
      map(([a, b]) => b.length - a.length)
    );
  }

  load(from: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';
    const params = new HttpParams().set('from', from);
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, { params, headers });
  }
}
