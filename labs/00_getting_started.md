# Getting Started

- [Getting Started](#getting-started)
  - [Before you start](#before-you-start)
    - [Required Software](#required-software)
  - [If you use IntelliJ / WebStorm: Getting started with IntelliJ / WebStorm](#if-you-use-intellij--webstorm-getting-started-with-intellij--webstorm)
  - [If you use Visual Studio Code: Getting Started with Visual Studio Code](#if-you-use-visual-studio-code-getting-started-with-visual-studio-code)
  - [If you are offline or behind a very restrictive firewall](#if-you-are-offline-or-behind-a-very-restrictive-firewall)
  - [Take a closer look at the starter kit](#take-a-closer-look-at-the-starter-kit)

## Before you start

### Required Software

- [NodeJS](https://nodejs.org/en/) in a current version (we test with the current LTS version)
- IDE / Editor
    - [Visual Studio Code](https://code.visualstudio.com/) (free) *or*
    - IntelliJ / WebStorm (commercial)
- Angular CLI (`npm i -g @angular/cli`)
    - If installation fails b/c of local firewall settings, you can also work without the CLI.

## If you use IntelliJ / WebStorm: Getting started with IntelliJ / WebStorm

> If you use Visual Studio code, you can skip this section.

In this part of the tutorial, you will pull (or download & extract ``[...].zip``) the starter kit and run it.

1. Pull the starter kit:

    https://github.com/L-X-T/[...]

    If you are using Linux, you should add the execution flag (x) to all files in the folder `node_modules\.bin` with `chmod`: ``chmod -R +x  node_modules``.

2. Open the starter kit in WebStorm/IntelliJ. This is the folder containing the ``package.json``.

3. Switch to the terminal and install the packages with `npm install` or `npm i`.

4. After installing the packages try running the starter kit with `npm start`.

    ![](https://i.imgur.com/7YG65wz.png)

    If you do not want to run the project in the IDE, you can also use `cmd` (under Windows) or `bash` (Linux and OS X) to open a shell in the root of the project and use `npm start`.

   Note: The development server does not put the required bundles on the disk but only keeps them in the main memory. When you change the source files, it recreates the bundles and then notifies the browser.
   To serve individual apps run `ng serve --project=<appname>`

5. Open it in the browser (`http://localhost:4200`). You should now see the demo application.

    If and only if this port is already taken, you can change adjust it in the project root's `package.json` file. To do this, add the `--port` option to the node scripts / start:

    ```json
    "scripts": {
        "start": "ng serve --port 4242", [...]
    }
    ```

## If you use Visual Studio Code: Getting Started with Visual Studio Code

> If you are using IntelliJ/WebStorm, you can skip this section.

In this part of the tutorial, you will pull (or download & extract ``[...].zip``) the starter kit and run it.

Tip: Install the following useful plugins for developing with Angular:

- [Angular Context Creator](https://marketplace.visualstudio.com/items?itemName=sjuulwijnia.kx-vscode-angular-context-creator)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

1. Pull the starter kit:

    https://github.com/L-X-T/[...]

    If you are using Linux or OS X, you should use `chmod` to add the execution flag (x) to all files in the `node_modules/.bin` folder: ``chmod -R +x  node_modules``.

2. Open the starter kit in Visual Studio Code.

3. Change to the command line (`CTRL+SHIFT+C`) or to the integrated Terminal (`CTRL+SHIFT+ö`)

4. Install the packages with `npm install` or `npm i`.

5. After installing the packages try running the starter kit with `npm start`.

    Note: The development server does not put the required bundles on the disk but only keeps them in the main memory. When you change the source files, it recreates the bundles and then notifies the browser.
    To serve individual apps run `ng serve --project=<appname>`

6. Open the demo in Chrome (http://localhost:4200)

    The port used may differ. You can see it from the console output at startup. If you want to change the port of a project, you can adjust this in the `package.json` file. To do this, add the `--port` option to the node `scripts/start`:

    ```json
    "scripts": {
        "start": "ng serve [...] --port 4242", [...]
    }
    ```

## If you are offline or behind a very restrictive firewall

To make things easier, the starter kit uses an Web API located at
http://www.angular.at/api/flight.

If your current environment does not allow access to that API you can use this secure one:
* https://demo.angulararchitects.io/api/Flight (https://demo.angulararchitects.io/api/Airport, ...)

If your current environment does not allow that either, you can use a local one:

1. Open a separate console window in the starter kit's root and start the local server using ``npm run json-server``.
2. Open the file ``libs\flight-lib\src\lib\services\flight.service.ts`` and set the field ``baseUrl`` to the value ``http://localhost:3000``.
3. In all exercises we do during the workshop, use ``http://localhost:3000`` **instead of** ``http://www.angular.at/api``.

## Take a closer look at the starter kit

In this part, you will take a closer look at the starter kit to familiarize yourself with it.

> **Important hint:** During **all** the labs, use ``CTRL``+``p`` in Visual Studio Code to quickly jump to a specific file. You can do the same by pressing ``SHIFT`` twice in WebStorm/IntelliJ.

1. Look at the component in the `app.component.ts` and `app.component.html` in the ``flight-app`` folder and find out what they do.

2. Note that the `app.component.html` has an element `<router-outlet></router-outlet>`. This is the placeholder for the router.

3. Have a look at the routing configuration in `app.routes.ts`.

4. Look at the module in the `app.module.ts` file.

5. In the `flight-booking` folder, look at the module in the file `flight-booking.module.ts` and the corresponding route configuration in the file `flight-booking.routes.ts`.

6. Look at the component in the files `flight-search.component.ts` and `flight-search.component.html` and find out what they do.

7. Notice how the `flight-search.component.ts` imports the `FlightService`. Notice that it comes from a library of the Monorepo project.

8. Go to the library ``flight-lib`` and look at the file `flight.service.ts` and the file `flight.ts`.

9. If you have not already done so, start the development web server:

    ```
    npm start
    ```

10. Open the project in the browser.
