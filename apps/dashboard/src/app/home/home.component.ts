import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  checked = true;

  changed(event: CustomEvent): void {
    // eslint-disable-next-line no-restricted-syntax
    console.debug('event', event);
    this.checked = event.detail;
  }
}
