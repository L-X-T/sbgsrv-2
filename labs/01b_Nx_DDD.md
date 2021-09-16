# Using Nx Workspaces and DDD

- [Using Nx Workspaces and DDD](#using-nx-workspaces-and-ddd)
  - [Create a New Application](#create-a-new-application)
  - [Add Another Feature Library](#add-another-feature-library)
  - [Inspect the Generated Access Rules](#inspect-the-generated-access-rules)
  - [Bonus: Route Between Feature Libs](#bonus-route-between-feature-libs)
  - [Bonus: Detecting Affected Libraries](#bonus-detecting-affected-libraries)
  - [Bonus: Implement an UI Library **](#bonus-implement-an-ui-library-)
  - [Bonus: Configure a Shared Utility Library **](#bonus-configure-a-shared-utility-library-)


So far, we've only used a simplified version of the architecture matrix presented. In this lab, you'll add a **luggage** domain with an application of its own. This domain will fully align with the ideas outlined. To prevent repeating monotonous tasks, you'll use the open source Nx plugin ``@angular-architects/ddd``.

## Create a New Application

1. Add the Nx plugin ``@angular-architects/ddd``:

    ```
    ng add @angular-architects/ddd
    ```

2. This command added some linting rules to your global ``.eslintrc.json``. Find out which ones and what they do.

    **Hint:** This task is a bit easier, if you use your IDE or editor (e. g. Visual Studio Code) to look into the current git staging environment.

3. Add an ``luggage`` domain with an application of it's own:

    ```
    ng g @angular-architects/ddd:domain luggage --add-app
    ```

4. Add an ``checkin`` feature:

    ```
    ng g @angular-architects/ddd:feature checkin --domain luggage --entity luggage --app luggage
    ```

5. Create a dependency graph to find out about the generated structure:

    ```
    npm run dep-graph
    ```

    It should show this luggage application:

    <img src="https://i.imgur.com/XXZKzEm.png" width="180">

6. Inspect the generated libs and the generated app. You should find the following:
   
   - Assigned tags within ``nx.json``
 
   - Further access restrictions within ``.eslintrc.json``.
 
   - A luggage data service, a luggage entity, and a check-in facade within the generated domain library
 
   - A check-in component within the generated feature library

    **Hint:** This task is a bit easier, if you use your IDE or editor (e. g. Visual Studio Code) to look into the current git staging environment.

7. Make yourself familiar with these generated building blocks.

8. Switch to your luggage app and open the file ``app.component.html``. Remove its whole content. As the code generator wired the apps and libs up for you, you can directly call the generated ``LuggageCheckinComponent``:

    ```html
    <luggage-checkin></luggage-checkin>
    ```

9.  Run your luggage app:

    ```
    ng serve luggage -o
    ```

    It should look like this:

    <img src="https://i.imgur.com/iMhswN1.png" width="400">


## Add Another Feature Library

Now, let's make our luggage application look like a more typical DDD-based application by adding another feature library:

```
ng g @angular-architects/ddd:feature report-loss --domain luggage --entity loss-report --app luggage
```

Generate another dependency graph (``npm run dep-graph``). It should look as follows:

<img src="https://i.imgur.com/XKlNoG8.png" width="350">


## Inspect the Generated Access Rules

Now, let's try out if the generated access rules protect our architecture.

1. Restart your IDE/ editor to make sure it reads the updated ``tsconfig.json``, ``nx.json``, and ``.eslintrc.json``.

1. Switch to the library ``luggage-feature-report-loss``.

2. Open the file ``luggage-feature-report-loss.module.ts`` and import the ``LuggageFeatureCheckinModule`` and the ``FlightLibModule``.

    **Hint:** You might need to create the necessary imports by hand.

    **Hint:** If you get linting errors in your IDE/ editor, ignore them for the time being.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    [...]
    import { LuggageFeatureCheckinModule } from '@flight-workspace/luggage/feature-checkin';
    import { FlightLibModule } from '@flight-workspace/flight-lib';

    @NgModule({
        imports: [
            CommonModule, 
            LuggageDomainModule, 

            // Add this:
            LuggageFeatureCheckinModule,
            FlightLibModule,
        ],
        declarations: [ReportLossComponent],
        exports: [ReportLossComponent]
    })
    export class LuggageFeatureReportLossModule {}
    ```

    </p>
    </details>



3. Switch to the console and lint the library:

    ```
    ng lint luggage-feature-report-loss
    ```

    You should get the following linting errors because the previously imported two modules violate our architecture:

    ```
    ERROR: D:/bak/beratung/angular2/workshops_advanced/advanced-nx-workspace/libs/luggage/feature-report-loss/src/lib/luggage-feature-report-loss.module.ts:6:1 - A project tagged with "type:feature" can only depend on libs tagged with "type:ui", "type:domain-logic", "type:util"

    ERROR: D:/bak/beratung/angular2/workshops_advanced/advanced-nx-workspace/libs/luggage/feature-report-loss/src/lib/luggage-feature-report-loss.module.ts:7:1 - A project tagged with "domain:luggage" can only depend on libs tagged with "do
    main:luggage", "domain:shared"
    ```

4. Remove the above introduced imports (``LuggageFeatureCheckinModule``, ``FlightLibModule``) again, to align with our architecture.

5. Now, if you run the linter (``ng lint luggage-feature-report-loss``) again, you shouldn't  get any linting errors - at least no errors regarding access restrictions between apps and libs.

## Bonus: Route Between Feature Libs

1. Open the file ``luggage-feature-checkin.module.ts`` and add a child route for its component:

    ```typescript
    [...]
    import { RouterModule } from '@angular/router';
    [...]

    @NgModule({
        imports: [
            CommonModule, 
            LuggageDomainModule,

            // Add this:
            RouterModule.forChild([
                { path: '', component: CheckinComponent }
            ])
        ],
        declarations: [CheckinComponent],
        exports: [CheckinComponent]
    })
    export class LuggageFeatureCheckinModule {}
    ```

    For the sake of simplicity, we only use one route per feature module. 

2. Do the same in the ``luggage-feature-report-loss.module.ts``.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript

    [...]
    import { RouterModule } from '@angular/router';
    [...]

    @NgModule({
        imports: [
            CommonModule, 
            LuggageDomainModule, 

            // Add this:
            RouterModule.forChild([
                { path: '', component: ReportLossComponent }
            ])
        ],
        declarations: [ReportLossComponent],
        exports: [ReportLossComponent]
    })
    export class LuggageFeatureReportLossModule {}
    ```    

    </p>
    </details>



3. Switch to your ``luggage`` app and open its ``app.module.ts`` file. Add the following root routes:

    ```typescript
    [...]
    import { RouterModule } from '@angular/router';
    [...]

    @NgModule({
        declarations: [AppComponent],
        imports: [
            BrowserModule, 

            // Remove this line:
            // LuggageFeatureCheckinModule, 

            // Remove this line:
            // LuggageFeatureReportLossModule,

            HttpClientModule, 

            // Add these routes:
            RouterModule.forRoot([
                { 
                    path: '', 
                    pathMatch: 'full', 
                    redirectTo: 'check-in'
                },
                { 
                    path: 'check-in', 
                    loadChildren: () => import('@flight-workspace/luggage/feature-checkin')
                                           .then(m => m.LuggageFeatureCheckinModule) 
                },
                { 
                    path: 'report-loss', 
                    loadChildren: () => import('@flight-workspace/luggage/feature-report-loss')
                                           .then(m => m.LuggageFeatureReportLossModule) 
                },
            ])
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
    ```

    Please note that these routes implement **lazy loading** of **feature modules**. Hence, we must **not import** these modules.

4. Switch to your ``app.component.html`` and add exchange the hard coded reference to a feature component by a ``router-outlet`` and a menu pointing to both features:

    ```html
    <ul>
        <li><a routerLink="check-in">Check-in</a></li>
        <li><a routerLink="report-loss">Report Loss</a></li>
    </ul>

    <router-outlet></router-outlet>
    ```

5. In order to style your luggage app a bit, add the following styles to the global ``styles.css`` (or ``styles.scss``, etc.):

    ```css
    body {
        font-family: cursive;
        padding-top: 80px;
        padding-left: 10px;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }

    li {
        float: left;
    }

    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        cursor: pointer;
    }

    li a:hover {
        background-color: #111;
    }
    ```

6. Start the luggage app and make sure the routing works.

    <img src="https://i.imgur.com/YxdZxWz.png" width="400">

## Bonus: Detecting Affected Libraries

After performing some changes, it's important to know which apps and libs might be affected by it. To rule out all the others, Nx can dramatically speed up retesting and recompiling your system.

1. If not already done, **initialize a new git repo** in your workspace root:

    ```
    git init
    ```

    We need Git here, because Nx uses the Git history to find out what changed.

1. Open your ``nx.json`` and make sure, the branch affected/defaultBase points to the name of your main branch:

    ```json
    "affected": {
        "defaultBase": "main"
    }
    ```

    

2. Commit all your changes:

    ```
    git add *
    git commit -m "whatever ;-p"
    ```

3. Make sure your main branch is called ``main`` to follow current conventions (originally it was called ``master``):

    ```
    git branch -M main
    ```

    **Remarks:** Our Nx configuration is assuming that the branch is called main. You can find the setting in your ``nx.json`` within the node ``affected/defaultBase``.

4. Switch to the ``luggage-feature-checkin`` lib and open the file ``luggage-feature-checkin.module.ts``.

5. Add a comment at the end to change the file.

6. Run the script ``affected:dep-graph``.

    ```
    npm run affected:dep-graph
    ```

7. Now, you should see all affected libs and apps highlighted.

8. To get the same information on the console, execute the following scripts:

    ```
    npm run affected:libs
    npm run affected:apps
    ```

    **Info:** Please also note, that the script ``affected:build`` only builds the affected apps including all the libs they depend on. Also, ``affected:test`` only executes the unit tests of all affected libs and/or apps. The scripts ``affected:e2e`` do the same for end-2-end tests and ``affected:lint`` only executes the linter for them. 
    
    **Important:** Before calling ``affected:build`` you have to compile everything to fill the Nx cache: ``npx nx build luggage --with-deps``.


## Bonus: Implement an UI Library **

1. Add an UI library providing a ``LuggageCardComponent`` (similar to the ``FlightCardComponent`` in the ``flight-app``)
  
  ```typescript
  ng g lib ui-card --directory luggage --buildable
  ```

  **Remarks:** The ``publishable`` (also ``buildable``) switch makes sure the library can be compiled separately which is the key for incremental compilation.

2. Now let's create a linting error: Import this module into your ``luggage-feature-checkin.module.ts``:

    ```typescript
    import { LuggageUiCardModule  } from '@flight-workspace/luggage/ui-card';

    [...]

    @NgModule({
    imports: [
        CommonModule, 
        LuggageDomainModule,

        // Add this:
        LuggageUiCardModule
    ],
    declarations: [CheckinComponent],
    exports: [CheckinComponent]
    })
    export class LuggageFeatureCheckinModule {}
    ```

3. Please note that the linter tells you now, that this access isn't allowed. If you don't get the linting error in your IDE, start the linter on the command line (``ng lint luggage-feature-checkin``).


4. Make sure, this UI library can only be accessed by the feature libraries in your domain. For this, open your ``nx.json`` assign the following tags to the lib:

    ```json
    "luggage-ui-card": {
      "tags": ["domain:luggage", "type:ui"]
    },
    ```
  
5. Restart your IDE, as global config files like ``nx.json`` are only read once during the program start.

6. Make sure, you don't get this linting error anymore. Optionally, you can also start the linter on the command line (``ng lint luggage-feature-checkin``).


## Bonus: Configure a Shared Utility Library **

- In ``nx.json`` Assign some additional tags to your ``logger-lib`` making sure it's part of the shared kernel's utility layer
  
  **Hint:** In addition to the preexisting tag ``shared`` -- which is needed for the simplified domains -- assign the tag ``domain:shared`` as well as the tag ``type:util``.
  
- Restart your IDE.
  
- Import the ``LoggerModule`` into your ``luggage-feature-checkin.module.ts``.

- Make sure you don't get a linting error for importing the ``LoggerModule``.
