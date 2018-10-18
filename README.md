# tkapi-explorer-client

Explorer (web-application) of the Tweede Kamer (Dutch parliament) Open Data Portaal (OData API).
Allows developers to view and explore relations and available data in the OData API.

Based on Angular 6+ and Bootstrap 4.

## Installation

Install dependencies,
```
npm install
```

## Development

Start a local Django development server for the API, see [tkapi-explorer-server](https://github.com/openkamer/tkapi-explorer-server)

Run a development Angular server that uses a local tkapi-explorer-server api,
```
ng serve
```

The application is available on `http://localhost:4200/`.

## Build

Run `ng build --prod` to build the project.

The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
