/* eslint-disable no-restricted-syntax */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthLibService } from '@flight-workspace/shared/auth-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean>;

  constructor(private authService: AuthLibService, private route: ActivatedRoute) {}

  _userName = '';

  get userName(): string {
    return this.authService.userName;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  changed($event): void {
    console.debug('$event.detail ', $event.target.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit(): void {
    this.needsLogin$ = this.route.params.pipe(map((params) => !!params['needsLogin']));
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
