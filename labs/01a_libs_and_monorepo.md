# Libraries and Monorepo

- [Libraries and Monorepo](#libraries-and-monorepo)
  - [Using the Project Monorepo](#using-the-project-monorepo)
  - [Use a library](#use-a-library)
  - [Bonus: Adapt your library *](#bonus-adapt-your-library-)
  - [Bonus: Export your library to a local npm registry **](#bonus-export-your-library-to-a-local-npm-registry-)
  - [Bonus: Writing a Passenger Library ***](#bonus-writing-a-passenger-library-)


## Using the Monorepo

In this exercise, you will expand your application by one page that lists all airports. You can orientate yourself by the existing `FlightSearchComponent`. The web API with the airports can be found here: `http://www.angular.at/api/airport`. 

Please note that the returned data is just an array with strings. For data access you will write an `AirportService` within the library `flight-lib`.

You can follow these steps:

1. Consider the Web API at `http://www.angular.at/api/airport` (if you need a secure URL try this one: `https://demo.angulararchitects.io/api/Airport`). Note that this Web API responds with either XML or JSON, and the answer is just an **array of strings**.

    An example of the JSON-based answer can be found here: http://www.angular.at/help. While the XML response uses Pascal-Case (eg ` From`), the JSON response uses the usual Camel case (eg ` from`). Thus, the practices of the two standards are taken into account.

2. In the `flight-lib` project, create a `services/airport.service.ts` file with a `AirportService` class. Similar to `FlightService` this class should offer the possibility to search for airports. For this, create a method findAll that returns a ``Observable<string[]>`` with the airport names:
   
    ``findAll(): Observable<string[]>``

    **Attention:** The web API at http://www.angular.at/api/airport returns all airports as an array with string. This string contains the names of the airports. That's why you do not need an interface to represent airports.

    <details>
    <summary>Show code</summary>
    <p>
    
    ```typescript
    
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';

    @Injectable({ 
        providedIn: 'root' 
    })
    export class AirportService {

        constructor(private httpClient: HttpClient) {}

        findAll(): Observable<string[]> {
            const url = 'http://www.angular.at/api/airport';
            return this.httpClient.get<string[]>(url);
        }
    }
    ```
    
    </p>
    </details>


3. Reexport the `AirportService` in the `index.ts` barrel, which is located at the root of the library.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    
    export { FlightLibModule } from './lib/flight-lib.module';
    export { Flight } from './lib/models/flight';
    export { FlightService } from './lib/services/flight.service';
    export { AirportService } from './lib/services/airport.service';
    ```

    </p>
    </details>

4. Switch back to the application (folder `flight-app/src/app/flight-booking`) and create an `AirportComponent`.  Implement these files in the same way as the files for the `FlightSearchComponent` so that they list all the airports.
   
    **Hint**: To generate the files needed, run the following command in your project's root: 
    ```
    ng generate component flight-booking/airport --project flight-app
    ```

    <details>
    <summary>Show code</summary>
    <p>
    
    ```typescript
    
    import { Component, OnInit } from '@angular/core';
    import { AirportService } from '@flight-workspace/flight-lib';

    @Component({
        selector: 'airport',
        templateUrl: './airport.component.html'
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
    ```

    </p>
    </details>

    <details>
    <summary>Show code (HTML)</summary>
    <p>
    
    ```html
    
    <div class="card">
    <div class="header">
        <h1 class="title">Airports</h1>
    </div>
    <div class="content">
        <div class="row">
        <div class="col-lg-3" *ngFor="let airport of airports">
            {{airport}}
        </div>
        </div>
    </div>
    </div>    
    ```
    
    </p>
    </details>

5. Register your component in the `FlightBookingModule` under `declarations`.
   If you used the cli to create the component it is already registered and you can skip this step.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    
    @NgModule({
        [...]
        declarations: [
            [...]    
            AirportComponent
        ],
        [...]
    })
    export class FlightBookingModule {}
    ```

    </p>
    </details>

6. Create a route ``airports`` for your new component in the `flight-booking.routes.ts` file.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    
    export const FLIGHT_BOOKING_ROUTES: Routes = [
        {
            [...],
            component: FlightBookingComponent,
            [...]
            children: [
                {
                    path: 'airports',
                    component: AirportComponent
                },
                [...]
            ]
        }
    ];
    ```

    </p>
    </details>

7. Set up a main menu item for your new route in the file `flight-booking.component.html`.

    <details>
    <summary>Show code</summary>
    <p>

    ```html
    
    <div class="card">
        <div class="content">
            <a routerLink="./flight-search">Flight Search</a> | 
            <a routerLink="./passenger-search">Passenger Search</a> |

            <!-- new menu item -->
            <a routerLink="./airports">Airports</a> 
        </div>
    </div>

    <router-outlet></router-outlet>
    ```

    </p>
    </details>

8. Test your solution.

## Use a library

In this example, you will look at the included ``logger-lib``.

1. Look at the barrel in the `index.ts` file.

2. Open the file ``logger.module.ts`` and have a look at the static  `forRoot` method. Find out how the library can be configured with it.

3. Take a closer look at the following services:
    - LoggerService
    - LoggerConfig

4. Look at the file `package.json` in the lib's folder and focus on the following properties:
    - name
    - version
    - peerDependencies

5. Look at the files `ng-package.*` in the `logger-lib` folder.

6. Open the file `tsconfig.json` and find out that there is a path mapping for the `logger-lib`.

7. Open the ``flight-app``'s `AppModule` and import the ``logger-lib`` into it.

    You may now have to manually write the necessary imports for the library:
    `import {LoggerModule} from '@flight-workspace/logger-lib';`

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    
    [...]
    import { LoggerModule } from '@flight-workspace/logger-lib'; 
        // ^^^ Perhaps you have to type this manually 
    [...]

    @NgModule({
        imports: [
            BrowserModule,
            HttpClientModule,
            LoggerModule.forRoot({ enableDebug: true }),
            [...]
        ],
        [...]
    })
    export class AppModule {}
    ```

    </p>
    </details>

8.  Switch to the `AppComponent` and have the `LoggerService` injected. Then log some information with it.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript 
    
    import { LoggerService } from '@flight-workspace/logger-lib';
        // ^^^ Perhaps you have to type this manually 

    @Component({
        selector: 'flight-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
    export class AppComponent  {
        constructor(private loggerService: LoggerService) {
            this.loggerService.log('log');
            this.loggerService.debug('debug');
        }
    }
    ```

    </p>
    </details>

9.  Test your solution. Make sure, that you have enabled debug information in your JavaScript console.

    ![](https://i.imgur.com/in5dIe5.png)


## Bonus: Adapt your library *

In this exercise, you extend the ``logger-lib`` by an ``LogFormatterService``. Your lib will provide a simple default implementation for it and the consumer of your library will have to possibility to exchange it by a custom implementation.

1. Open your library and move to the folder ``src/lib``. 

2. Add a file ``log-formatter.service.ts``:

    ```typescript
    export abstract class LogFormatterService {
        abstract format(message: string): string;
    }
    ```
3. Add a file ``default-log-formatter.service.ts`` with an default implementation of ``LogFormatterService`` that just returns the message without any formatting.

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript
    import { Injectable } from '@angular/core';
    import { LogFormatterService } from './log-formatter.service';

    @Injectable()
    export class DefaultLogFormatterService implements LogFormatterService {
        format(message: string): string {
            return message;
        }
    }
    ```

    </p>
    </details>

4. Open the ``logger.service.ts`` file and inject the ``LogFormatterService`` into the ``LoggerService``. Use it to format the log messages.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    @Injectable({ 
        providedIn: 'root' 
    })
    export class LoggerService {

        constructor(
            private config: LoggerConfig,
            private logFormatter: LogFormatterService
        ) {}

        debug(message: string): void {
            if (!this.config.enableDebug) return;
            console.debug(this.logFormatter.format(message));
        }

        log(message: string): void {
            console.log(this.logFormatter.format(message));
        }
    }
    ```

    </p>
    </details>


5. Open the ``logger.config.ts`` file and add an optional field that points to a LogFormatterService class (!) to use. A type that points to such a class can be written as follows:

    ```typescript
    export type LogFormatterServiceType = new () => LogFormatterService;
    ```

    <details>
    <summary>Show code</summary>
    <p>
    
    ```typescript
    import { LogFormatterService } from './log-formatter.service';

    export type LogFormatterServiceType = new () => LogFormatterService;

    export abstract class LoggerConfig {
        enableDebug = false;
        logFormatterType?: LogFormatterServiceType;
    }    
    ```
    
    </p>
    </details>

6. Open the ``index.ts`` file and export the newly introduced ``DefaultLogFormatterService``.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    export { LoggerConfig } from './lib/logger.config';
    export { LoggerModule } from './lib/logger.module';
    export { LoggerService } from './lib/logger.service';

    // Add this:
    export { LogFormatterService } from './lib/log-formatter.service';
    export { DefaultLogFormatterService } from './lib/default-log-formatter.service';
    ```

    </p>
    </details>


7. Open the file ``logger.module.ts``. Modify the ``forRoot`` method, so that it binds the ``LogFormatterService`` token to the ``LogFormatterService`` class in the passed configuration object.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    const defaultFormatterConfig = [{
        provide: LogFormatterService,
        useClass: DefaultLogFormatterService
    }];

    @NgModule({
        imports: [CommonModule],
        declarations: []
    })
    export class LoggerModule { 
        static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
            
            return {
                ngModule: LoggerModule,
                providers: [
                    { provide: LoggerConfig, useValue: config },

                    // This is a bit special but needed as the 
                    // Angular Compiler needs to statically find
                    // out whats going on here ...
                    (!config.logFormatterType) ? 
                        defaultFormatterConfig : 
                        { provide: LogFormatterService, useClass: config.logFormatterType },
                ]
            }
        }

    }
    ```
    </p>
    </details>

8. Switch your your ``flight-app``. In your application, switch to the `shared` folder and create a new `logging` sub-folder.

9.  In the new `logging` folder, create a `custom-log-formatter.service` file with a service that implements the abstract class `LogFormatterService`:

    <details>
    <summary>Show code</summary>
    <p>
    
    ```typescript
    
    import { Injectable } from '@angular/core';
    import { LogFormatterService } from '@flight-workspace/logger-lib';
        // ^^^ Perhaps you have to type this manually

    @Injectable()
    export class CustomLogFormatterService implements LogFormatterService {
      
        format(message: string): string {
            const now = new Date().toISOString();
            return `[${now}] ${message}`;
        }

    }
    ```

    </p>
    </details>

10. Register the new service in the `AppModule` when calling ``LoggerModule.forRoot``.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    [...]

    @NgModule({
        imports: [
            BrowserModule,
            HttpClientModule,
            FlightBookingModule,
            LoggerModule.forRoot({ 
                enableDebug: true,
                // Add this:
                logFormatterType: CustomLogFormatterService
            }),

            [...]
        ],
        [...]
    })
    export class AppModule {}

    ```

    </p>
    </details>

11. Test your application and notice that the new log format, including the current time, is now being used.

## Bonus: Export your library to a local npm registry **

In this exercise you will download a simple npm registry using ``npm install`` and use it to publish your library. If you don't have the necessary rights for downloading the registry, skip this lab.

1. Download the local npm registry verdaccio: 

    ```
    npm i -g verdaccio
    ```

2. Start it in a seperate command prompt: 

    ```
    verdaccio
    ```

    **If, and only if your are offline:** When starting verdaccio, it displays the name of its config file, e. g. ``C:\Users\Manfred\AppData\Roaming\verdaccio\config.yaml``. Open this file and search for the following section:

    ```
    uplinks:
      npmjs:
        url: https://registry.npmjs.org/
    ```

    Delete this section and restart verdaccio to prevent, verdaccio is acting as a proxy for an internet-based registry.

3. After starting verdaccio for the first time, you have to add a user:
    
    ```
    npm adduser --registry http://localhost:4873/
    ```

4. At the console, switch to your monorepos's root folder.

5. Build the library with `ng build logger-lib`.

    Under Linux and OS X, you may need to use chmod to set the x flag for all files in the `node_modules/.bin` folder.

6. Move to the ``dist/logger-lib`` folder of your library and deploy it to verdaccio:
    
    ```
    npm publish --registry http://localhost:4873/
    ```

    If you have already published it and you want to republish it, don't forget to increase your version number in the ``src/package.json`` file. For this, you can switch to the ``src`` folder and call ``npm version minor``.

7. Open a browser window and navigate to verdaccio (http://localhost:4873/). Find out, that your library ist listed there.


## Bonus: Writing a Passenger Library ***

In this bonus exercise, you will use the know-how collected above to write an other library for loading and saving passengers. As the existing ``flight-lib`` library it shall provide the possibility to load and save entities. You can use the contents of the existing ``flight-lib`` as an inspiration for this exercise.

Use this library to implement the menu item ``flights | passengers``. 

The following two sections provide further information on this.

**Creating a Libray**

To create a library you can use the following command:

```
ng generate lib passenger-api
```

If you have not installed the CLI, you can use the local installation:

```
npm run ng -- generate lib passenger-api
```

**Consuming a Web API***

The Web API for passengers can be found here:

    - www.angular.at/api/passenger (or https://demo.angulararchitects.io/api/Passenger)

You can load data using ``GET`` and write data using ``POST``. To update an existing passenger, use POST with his/her current Id. To insert a new one, use POST with the Id ``0``.

More information about this endpoint can be found here:

    - www.angular.at/help

Please note that it supports both, ``XML`` and ``JSON``. While in ``XML`` names are written in 'PascalCase', in ``JSON`` 'camelCase' is used.


