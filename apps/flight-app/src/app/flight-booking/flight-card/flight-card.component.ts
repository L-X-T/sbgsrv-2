/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: Flight;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  locale = 'de'; // caution: for the sake of simplicity we use language as locale here
  private localeSubscription: Subscription;

  langeChange$: Observable<string>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private element: ElementRef,
    private translateService: TranslateService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    /*this.localeSubscription = this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.locale = langChangeEvent.lang;
      this.changeDetectorRef.detectChanges();
    });*/

    this.langeChange$ = this.translateService.onLangChange.pipe(map((langChangeEvent: LangChangeEvent) => langChangeEvent.lang));
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    if (this.localeSubscription) {
      this.localeSubscription.unsubscribe();
    }
  }

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
