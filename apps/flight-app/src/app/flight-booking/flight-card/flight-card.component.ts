/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: Flight;
  @Input() selected: boolean;
  @Input() locale: string;
  @Output() selectedChange = new EventEmitter<boolean>();

  // langeChange$: Observable<string>;

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {
    /*this.localeSubscription = this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.locale = langChangeEvent.lang;
      this.changeDetectorRef.detectChanges();
    });*/
    // this.langeChange$ = this.translateService.onLangChange.pipe(map((langChangeEvent: LangChangeEvent) => langChangeEvent.lang));
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  select(): void {
    this.selected = true;
    this.selectedChange.next(true);
  }

  deselect(): void {
    this.selected = false;
    this.selectedChange.next(false);
  }

  blink(): void {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
    //              ^----- DOM-Element

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }
}
