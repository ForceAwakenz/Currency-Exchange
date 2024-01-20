# CurrencyExchange <img src="src/assets/currency_logo.svg" height="40px" />

This application is a currency exchange rate converter built with Angular.
It allows users to select a base currency and see the exchange rates for other currencies.

## Features

-   Real-time exchange rates: The application fetches the latest exchange rates from a reliable API.
-   Currency selection: Users can select from a list of available currencies for conversion.
-   Digital fraction settings: Users can set the number of decimal places to display for exchange rates.
-   Changing any field automatically triggers recalculation of other fields

## Technologies Used

<a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="20" height="20"/> </a> Angular: The application is built with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

-   RxJS: Used for handling asynchronous data streams.
-   Angular Material: Used for UI components.
-   StorageService: A custom service for storing user settings like the number of decimal places to display.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4422/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
