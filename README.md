# rx-context

**Still under development.**

This angular module is based on [Rob Wormald](https://twitter.com/robwormald)'s presentation at the [angular meetup in April](https://youtu.be/bH73HCxjDH0?t=38m39s).

## Installation

You can install it like this.

```
npm install rx-context
```

## Usage 

It provides a directive to unwrap and manage an observable.

```
<div *rxContext="let data on data$">
  {{data.title}}
</div>
``` 

This could be done also with the `async` like this.

``` 
{{(data | async)?.title}}
```

But the `rx-content` directive can also handle errors, completion of observables with corresponding
templates. It also can handle observables that return a `null` values or are replaced by `null`
 
You can use optional `ng-template` like with `*ngIf`.

Full example.

```
<div *rxContext="let data on data$; error errorBlock 
                                    complete completeBlock 
                                    empty emptyBlock">
  {{data.title}} changes with every next()
</div>
<ng-template let-error #errorBlock>
  only show when the observable has an 
  {{error}}
</ng-template>
<ng-template #completeBlock>
  only show when the observable completed
</ng-template>
<ng-template #emptyBlock>
  only show when the observable returns an null value or
  is null
</ng-template>
```


## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
