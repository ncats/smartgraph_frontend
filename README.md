# Smrtgraph

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## To Cite
Zahoránszky-Kőhalmi, G., Sheils, T. & Oprea, T.I. SmartGraph: a network pharmacology investigation platform. J Cheminform 12, 5 (2020). [https://doi.org/10.1186/s13321-020-0409-9]( https://doi.org/10.1186/s13321-020-0409-9)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build
`npm i` to install dependencies
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Running with neo4j
1. Start neo4j instance with correct graph
2. Update `neo4jUser` and `neo4jPassword` constants in `backend.ts`
3. In a separate terminal execute `node backend.ts`
4. Run `ng serve`
