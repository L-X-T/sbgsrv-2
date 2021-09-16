# RxJs

- [RxJs](#rxjs)
  - [Simple Lookahead](#simple-lookahead)
  - [Bonus: Further Operators for Lookahead *](#bonus-further-operators-for-lookahead-)
  - [Bonus: Size Difference of two Search Results *](#bonus-size-difference-of-two-search-results-)
  - [Combine Streams *](#combine-streams-)
  - [Bonus: Search by from and to **](#bonus-search-by-from-and-to-)
  - [Bonus: Refresh Button ***](#bonus-refresh-button-)
  - [Error Handling *](#error-handling-)
  - [Shopping Basket with Scan *](#shopping-basket-with-scan-)
  - [Bonus: Result History with Scan **](#bonus-result-history-with-scan-)
  - [Custom Operator: switchMapCompensate *](#custom-operator-switchmapcompensate-)
  - [Bonus: Custom Operator: switchMapRetry **](#bonus-custom-operator-switchmapretry-)
  - [Bonus: Custom Operator: switchMapBackoff for Exponential Backoff **](#bonus-custom-operator-switchmapbackoff-for-exponential-backoff-)

## Simple Lookahead 

In this exercise, you'll implement the presented lookahead. For this, you can use the following API:

    http://angular.at/api/flight?from=G

As you see in this URL, the API takes an parameter for filtering flights with respect to a specific airport name.

1. Open the file ``app.module.ts`` and make sure, that the ``ReactiveFormsModule`` is imported into the ``AppModule``.

    <details>
    <summary>Show code</summary>
    <p>

    ```TypeScript
    [...]
    import { ReactiveFormsModule } from '@angular/forms';
    [...]
    
    @NgModule({
        imports: [
            BrowserModule,
            HttpClientModule,
            ReactiveFormsModule,
            [...]
       ],
       [...]
    })
    export class AppModule {}
    ```

    </p>
    </details>

2. Switch to the folder ``app`` an create a ``FlightLookaheadComponent``. Make sure, it is declared in the ``AppModule``.

3. Open the file ``app.routes.ts`` and create a route for your new component.

    <details>
    <summary>Show code</summary>
    <p>

    ```TypeScript
    export const APP_ROUTES: Routes = [
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        },
        {
            path: 'home',
            component: HomeComponent
        },
        // Insert this line:
        {
            path: 'flight-lookahead',
            component: FlightLookaheadComponent
        },
        [...]
        
    ]
    ```

    </p>
    </details>

4. Open the ``sidebar.component.html`` file and create a menu option for the new route.

    <details>
    <summary>Show code</summary>
    <p>

    ```html
    <li>
        <a routerLink="flight-lookahead">
            <i class="ti-user"></i>
            <p>Lookahead</p>
        </a>
    </li>
    ```

    </p>
    </details>

5. Switch back to your new component and add the following properties:

    ```TypeScript
    control: FormControl;
    flights$: Observable<Flight[]>;
    loading: boolean;
   ```

6. Inject the ``HttpClient`` into its constructor.

    <details>
    <summary>Show code</summary>
    <p>

    ```TypeScript
    constructor(private http: HttpClient) {}
    ```

    </p>
    </details>

7. Create a method ``load(from: string):Observable<Flight[]> { ... } ``. Implement this method, so that all flights starting at the passed airport are returned.    

    <details>
    <summary>Show code</summary>
    <p>

    ```TypeScript
    load(from: string): Observable<Flight[]> {
        const url = "http://www.angular.at/api/flight";
        const params = new HttpParams().set('from', from);
        const headers = new HttpHeaders().set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers});
    }
    ```

    </p>
    </details>

8. Implement the Interface ``OnInit``. Use the ``ngOnInit`` method to establish the needed dataflow between your input control  (property ``control``) and your result (``flights$``).

    <details>
    <summary>Show code</summary>
    <p>

    ```TypeScript
    export class FlightLookaheadComponent implements OnInit {

        ngOnInit(): void {
            this.control = new FormControl();

            this.flights$ = 
                this.control
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        tap(input => this.loading = true),
                        switchMap(input => this.load(input)),
                        tap(v => this.loading = false)
                    );
        }

        [...]
    }
    ```

    </p>
    </details>

9. Open the file ``flight-lookahead.component.html`` and create an input element. Bind it to your control object. Also, display the value of your property ``loading``.

    <details>
    <summary>Show code</summary>
    <p>

    ```html
    <div class="card">
    <div class="header">
    <h1 class="title">Lookahead</h1>
    </div>

    <div class="content">

    <div class="control-group">
        <label>City</label>
        <input [formControl]="control" class="form-control">
    </div>

    <div *ngIf="loading">Loading ...</div>

    </div>
    </div>

    ```

    </p>
    </details>

10. Create a new table and bind it to your ``flights$`` property using the ``async`` pipe.

     <details>
     <summary>Show code</summary>
     <p>

     ```html
     <table class="table table-striped">
         <tr *ngFor="let f of flights$ | async">
             <td>{{f.id}}</td>
             <td>{{f.from}}</td>
             <td>{{f.to}}</td>
             <td>{{f.date | date:'dd.MM.yyyy HH:mm'}}</td>
         </tr>
     </table>
     ```

     </p>
     </details>

11. Test your solution.

## Bonus: Further Operators for Lookahead *

In this exercise, you'll add the operators ``distinctUntilChanged`` and ``filter`` to your case study. You find further information about them at ``http://rxmarbles.com``.

1.	Look at the docs for ``distinctUntilChanged`` at http://rxmarbles.com/#distinctUntilChanged and integrate it into your example. The goal is to prevent an additional http call when during a ``debounce`` period something is changed and undone again.

1. Test your solution. You can use your browser's network tab find out how many http requests are sent out.

3.	Have a look at the docs of the operator ``filter`` at http://rxmarbles.com/#filter. Integrate it into your example to make sure that a http request is only done after the user has entered 3 characters at minimum.

4.	Test your solution.


## Bonus: Size Difference of two Search Results *

In this example, you'll calculate the size difference of two subsequent search results. Let's assume, the first search brings up 10 flights and the second one brings 15. In this case, the calculated difference is 5.

For this, create an observable using the existing ``flights$`` observable:

```typescript
this.diff$ = this.flights$.pipe(
    // here we need some operators ...
);
```

To finish this implementation, you'll need the operators ``pairwise`` and ``map``. You can find a description for ``pairwise`` [here](https://rxjs-dev.firebaseapp.com/api/operators/pairwise) and [here](https://www.learnrxjs.io/operators/combination/pairwise.html).

<details>
<summary>Solution</summary>
<p>

```typescript
this.diff$ = this.flights$.pipe(
    pairwise(),
    map( ([a, b]) => b.length - a.length )
);
```

</p>
</details>

## Combine Streams *

In this example, you'll introduce another observable that simulates the network state. Also, you will make sure, that your solution will only search for flights if the state is "connected".

1. Add the following properties to your component:

    - ``online = false``;
    - ``online$: Observable<boolean>``;

2. Add the following lines to your ``ngOnInit`` method.

    ```TypeScript
    ngOnInit(): void {
        this.control = new FormControl();

        this.online$ = interval(2000).pipe(
            startWith(0),
            map(_ => Math.random() < 0.5),
            distinctUntilChanged(),
            tap(value => this.online = value)
        );
        [...]
    }
    ```
    As you can see here, ``online$`` can emit a new network state (true or false for connected and disconnected) every two seconds. As it is a cold observable, it will only start sending data after a a subscription has been setup. Hence, you'll combine it with the other observable in the next step.

3. Have a look at http://rxmarbles.com to find out how ``combineLatest`` and ``filter`` work. Try to find out how to use them to combine the new ``online$`` observable with the existing ``flights$`` observable. The goal is to only search for flights when the machine is connected.

    **Hint:** ``combineLatest`` returns an array with the current values of the combined observables:

    ```TypeScript
    combineLatest([observable1, observable2]).subscribe(
        (tuple) => {
            const latestFromObservable1 = tuple[0];
            const latestFromObservable2 = tuple[1];
            [...]
        }
    )
    
    [...]

    // The same, with a compacter syntax:
    combineLatest([observable1, observable2]).subscribe(
        ([latestFromObservable1, latestFromObservable2]) => {
            [...]
        }
    )
    ```

    **Hint:** Further information about  ``combineLatest`` can be found at https://www.learnrxjs.io.

    <details>
    <summary>Solution</summary>
    <p>

    ```typescript

    this.online$ = interval(2000).pipe(
            startWith(0),
            map(_ => Math.random() < 0.5),
            distinctUntilChanged(),
            tap(value => this.online = value)
        );

    const input$ = this.control.valueChanges.pipe(
        debounceTime(300));

    this.flights$ = combineLatest([input$, this.online$]).pipe(
        filter(([, online]) => online),
        map(([input]) => input),
        switchMap(input => this.load(input))
    );
    ```

    </p>
    </details>


1. Display the value of ``online`` (not ``online$``) via data binding:

    ```html
    <div>Online: {{online}}</div>
    ```

2. Test your solution.


## Bonus: Search by from and to **

Implement a second textbox for the airport of destination (field ``to``). When ever the field ``from`` or ``to`` is modified, the result table shall be updated.

Make sure, no query is sent to the server, when both, ``from`` and ``to`` are empty.

**Hint:** ``combineLatest`` can take several parameters: 

```typescript
combineLatest([a$, b$, c$]).pipe(
    tap(([a,b,c]) => console.debug('abc', a, b, c) );
)
```



## Bonus: Refresh Button ***

Now, let's try to introduce a button reloading the current result set. For this, add an observable and a click handler for the button:

```typescript
private refreshClickSubject = new Subject<void>();
refreshClick$ = this.refreshClickSubject.asObservable();

refresh(): void {
    this.refreshClickSubject.next();
}
```

<details>
<summary>Solution</summary>
<p>

```typescript
[...]

const debouncedFrom$ = this.controlFrom.valueChanges.pipe(debounceTime(300));
const debouncedTo$ = this.controlTo.valueChanges.pipe(debounceTime(300));

const combined$ = combineLatest([debouncedFrom$, debouncedTo$, this.online$])
                    .pipe(shareReplay({ bufferSize:1, refCount: true }));

this.flights$ = merge(
    combined$,
    this.refreshClick$.pipe(map(_ => [this.controlFrom.value, this.controlTo.value, this.online]))
    
    // This is an alternative without side effects (like this.online):
    // this.refreshClick$.pipe(switchMap(_ => combined$.pipe(take(1))))
).pipe(
    filter( ([_, __,  online]) => online),
    map(([value, valueTo, _]) => [value, valueTo]),
    // further remaining operators
);
```

</p>
</details>

The button in the template looks like this:

```html
<button (click)="refresh()">Refresh</button>
```

To implement the logic, ``merge`` the result of your existing ``combineLatest`` call with ``refreshClick$``. You find some information about ``merge`` [here](https://rxmarbles.com/#merge) and [here](https://www.learnrxjs.io/operators/combination/merge.html).

Make sure to emit the current search criteria via ``refreshClick$``.




## Error Handling *

Have a look at the description of [catchError](https://rxjs-dev.firebaseapp.com/api/operators/catchError) and [retry](https://rxjs-dev.firebaseapp.com/api/operators/retry) and try to use these operators in your lookahead example.

**Hint:** Change your ``online$`` observable so that it always returns ``true`` (``map(_ => true)``). 

**Hint:** Use your network tab within the F12 tools to simulate an offline state.

<!-- ## RetryWhen **

RetryWhen gets an Observable that emits the current error as a regular value. You have the following options:

- Return the observable, e. g. with a delay, and RxJS returns the failed action
- Return  -->

## Shopping Basket with Scan *

Let's allow to add flights to a shopping basket in a reactive way. For this, add a ``basket$`` Observable as well as an Observable ``addToBasket$``:

```typescript
basket$: Observable<Flight[]>;

private addToBasketSubject = new Subject<Flight>();
addToBasket$ = this.addToBasketSubject.asObservable();
```

Also, add a method ``select``:

```typescript
select(f: Flight): void {
    this.addToBasketSubject.next(f);
}
```

Use ``select`` and ``basket$`` in your basket:

```html
<table class="table table-striped">
    <tr *ngFor="let f of flights$ | async">
        [...]
        <td><a (click)="select(f)">Select</a></td>
    </tr>
</table>

<pre *ngIf="basket$ | async as basket">{{ basket }}</pre>
```


Now, within ``ngOnInit``, connect ``addToBasket$`` to ``basket$`` so that ``basket$`` always contains the selected flights. In order to prevent side effects, use the [scan operator](https://rxjs-dev.firebaseapp.com/api/operators/scan) for this.

<details>
<summary>Solution</summary>
<p>

```typescript
this.basket$ = this.addToBasket$.pipe(
    scan((acc, flight) => {
        return [...acc, flight]
    }, [])
);
```

</p>
</details>

## Bonus: Result History with Scan **

Use the ``scan`` operator in a similar way as in the last exercise to provide an observable with **all** flights you've found while using the lookahaed. E. g., if searching for _Graz - Hamburg_ and then for _Frankfurt - Berlin_ one should find the results of both requests within this observable. 

Also, display these flights within your template.

## Custom Operator: switchMapCompensate *

Write a custom ``switchMapCompensate`` operator combining the usage of ``switchMap`` and ``catchError``. It shall allow to write 

```typescript
const result$ = myObservable$.pipe(
    switchMapCompensate(([value, valueTo]) => this.load(value, valueTo)),
);
```

instead of:

```typescript
const result$ = myObservable$.pipe(
    switchMap(([value, valueTo]) => this.load(value, valueTo)
                                        .pipe(catchError(err => of([])))),
); 
```      


<details>
<summary>First Simple Solution (untyped)</summary>
<p>

```typescript
function switchMapCompensate(projector) {
    return (source$) => {
        return source$.pipe(
            switchMap( p => projector(p).pipe(catchError(_ => of([]))))
        )
    };
}
```

</p>
</details>


<details>
<summary>Typed Solution</summary>
<p>

```typescript
type Projector<T, U> = (item: T) => Observable<U>;

function switchMapCompensate<T,U>(projector: Projector<T,U>) {
  return (source$: Observable<T>) => {
    return source$.pipe(switchMap( (p:T) => projector(p).pipe(catchError(_ => of([])))))
  };
}
```

Please note, that our ``Projector`` type is a bit simpler than the one used by ``switchMap``. However, for our case and for a lot of other cases it should be good enough. 

</p>
</details>


## Bonus: Custom Operator: switchMapRetry **

Use the technique from the last exercise to write a ``switchMapRetry`` operator combining ``switchMap`` and ``retry``. Provide a way to configure the amount of retries. 

## Bonus: Custom Operator: switchMapBackoff for Exponential Backoff **

Have a look to the description of [retryWhen](https://rxjs-dev.firebaseapp.com/api/operators/retryWhen).

Also, have a look to the following custom operator implementing a combination of ``switchMap`` and ``retryWhen`` to provide an exponential backoff. This means we are waiting ``2^i * delay`` milliseconds before retrying a failed action where ``i`` is the count of already performed retries and ``delay`` represents the delay of the first retry:

```typescript
export interface SwitchMapRetryOptions {
    delayMsec: number;
    maxRetries: number;
}

const defaults: SwitchMapRetryOptions = {
    delayMsec: 500,
    maxRetries: 3
}

export function switchMapBackoff<T, U>(
    projector: Projector<T, U>, 
    { maxRetries, delayMsec }: SwitchMapRetryOptions = defaults) {
    let i = 0;
    return pipe(
        switchMap((item:T) => projector(item).pipe(
            retryWhen(err$ => err$.pipe(
                switchMap(err => {
                    if (i++ >= maxRetries) {
                        return throwError(err);
                    } 
                    return of(err).pipe(delay(Math.pow(2, i) * delayMsec))
                }), 
            ))
        ))
    );
}
```

Further tasks:

- Try to find out how this operator works
- Use this operator in your example (just copy/paste it this time)
- Use the network tab (F12 dev tools) to see how it works
