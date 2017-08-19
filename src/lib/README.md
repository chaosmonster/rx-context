# rx-context

**Still under development.**

This angular module is based on [Rob Wormald](https://twitter.com/robwormald)'s presentation at the [angular meetup in April](https://youtu.be/bH73HCxjDH0?t=38m39s).

You can install it like this.

```
npm install rx-context
```
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
