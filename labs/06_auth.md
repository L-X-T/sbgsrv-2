# Angular Workshop: OAuth 2 and OIDC

- [Angular Workshop: OAuth 2 and OIDC](#angular-workshop-oauth-2-and-oidc)
  - [Authentication](#authentication)
  - [Authorization for the Web API](#authorization-for-the-web-api)
  - [Bonus: Token-Refresh *](#bonus-token-refresh-)
    
## Authentication

In this part of the exercise you will use the library ``angular-oauth2-oidc`` to authenticate against an cloud-based authorization server.

1. Open your ``package.json`` and notice that the package `angular-oauth2-oidc` has been installed.

2. Import the `OAuthModule` into your `AppModule` using the method `forRoot`.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    
    import { OAuthModule } from 'angular-oauth2-oidc';

    [...]

    @NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,

        OAuthModule.forRoot(),

        [...]
    ],
    [...]
    })
    export class AppModule {}
    ```

    </p>
    </details>

3. Create a configuration file `auth.config.ts` in your application's ``app`` folder:
    ```typescript
    import { AuthConfig } from 'angular-oauth2-oidc';

    export const authConfig: AuthConfig = {
        issuer: 'https://idsvr4.azurewebsites.net',
        redirectUri: window.location.origin + '/index.html',
        clientId: 'spa',
        responseType: 'code',
        scope: 'openid profile email offline_access api'
    }
    ```

4. Inject the `OAuthService` into your `AppComponent` and configure it.

    ```typescript
    @Component({[...]})
    export class AppComponent  {
        constructor([...] private oauthService: OAuthService) {
            [...]

            this.oauthService.configure(authConfig);
            this.oauthService.loadDiscoveryDocumentAndTryLogin();
        }
    }
    ```

5. If you have written an `AuthService` in another exercise, update it so that it uses the `OAuthService`. 
   Otherwise, create a new `AuthService` in the `shared/auth` folder:

    ```typescript
    import { OAuthService } from 'angular-oauth2-oidc';
    import { Injectable } from '@angular/core';

    @Injectable({
        providedIn: 'root'
    })
    export class AuthService {

        constructor(private oauthService: OAuthService) {}
        
        get userName(): string {
            const claims = this.oauthService.getIdentityClaims();
            return claims ? claims['given_name'] : null;
        }

        login(): void {
            this.oauthService.initLoginFlow();
        }

        logout(): void {
            this.oauthService.logOut();
        }
        
    }
    ```

6. Inject the `AuthService` into your `HomeComponent` and use it to greet the user with his first name. 
Also provide buttons for logging in and out. These should delegate to the `AuthService`.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    
    @Component({ [...] })
    export class HomeComponent {

        constructor([...] private authService: AuthService) {}

        [...]

        get userName(): string {
            return this.authService.userName;
        }

        login(): void {
            this.authService.login();
        }

        logout(): void {
            this.authService.logout();
        }

    }
    ```

    </p>
    </details>

    <details>
    <summary>Show code (HTML)</summary>
    <p>

    ```html
    
    <h1 *ngIf="userName">Welcome, {{userName}}!</h1>
    <h1 *ngIf="!userName">Welcome!</h1>
    
    <div class="card">
        <div class="content">
            <button class="btn btn-default" (click)="login()">Login</button>
            <button class="btn btn-default" (click)="logout()">Logout</button>
        </div>
    </div>
    ```

    </p>
    </details>

1. Test your solution. You can log in with user:`bob` and pass:`bob`. 


## Authorization for the Web API

In this part of the exercise you will use the received access token to call a secured web api.

1.  If you wrote an `AuthInterceptor` in an earlier exercise, update it so that it now sends the current access token. 
    If you do not have an interceptor, write one in the `shared/auth` folder.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
   
    import { Injectable } from '@angular/core';
    import { Router } from '@angular/router';
    import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
    import { Observable, throwError } from 'rxjs';
    import { catchError } from 'rxjs/operators';

    import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';

    @Injectable()
    export class AuthInterceptor implements HttpInterceptor {
        
        constructor(private storage: OAuthStorage, private router: Router) {}

        public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
            if (req.url.startsWith('http://www.angular.at')) {
                const headers = req.headers.set('Authorization', 
                                        'Bearer ' + this.storage.getItem('access_token'));

                req = req.clone({ headers });
            }
            
            return next.handle(req).pipe(
                catchError(error => this.handleError(error))
            );
        }

        private handleError(event: HttpErrorResponse) {
            if (event.status == 401 || event.status == 403) {
                this.router.navigate(['/home', {needsLogin: true}]);
            }
            
            return throwError(event);
        }
    }
    ```

    </p>
    </details>

2.  Make sure that the `AuthInterceptor` is registered in the `SharedModule`:

    ```typescript
    
    @NgModule({ ... })
    export class SharedModule {
        static forRoot(): ModuleWithProviders {
            return {
                ngModule: SharedModule,
                providers: [
                    [...], // keep existing providers ...
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: AuthInterceptor,
                        multi: true
                    }
                ]
            }
        }
    }
    ```

3.  Log in with user:`bob` and pass:`bob`. 
    Search again for flights. Now you should get data.

4.  Trace the exchanged message using the network tab in the Dev Tools (F12) and notice that the access token is being sent in the Authorization header. Look into the received token using jwt.io.

## Bonus: Using OAuthService with module federation *

If you're using **module federation** with our `@angular-architects/module-federation` package, then you have to add our `angular-oauth2-oidc` to the shared libraries in both webpack config. This way the shell will still be able to load and use the micro frontend:

```typescript
[...]

   shared: share({
      '@angular/core': { [...] },
      [...],
      'angular-oauth2-oidc': { [...] },
   
      ...sharedMappings.getDescriptors()
   })

[...]
```

## Bonus: Token-Refresh *

Have a look at [this part of the documentation](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/refreshing-a-token.html) to find out how to configure token refresh.

*Hint:* To test if it works, set the property ``timeoutFactor`` in your ``auth.conf.ts`` to ``0.01`` and have a look to the network tab in your browser's dev tools (F12).
