import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/mapTo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  default$ = Observable.of({title: 'default'});
  complete$ = Observable.of({title: 'next'}).concat(Observable.timer(2000).mapTo({title: 'complete'}));
  emptyToValue$ = Observable.of(null).concat(Observable.timer(6000).mapTo({title: 'that was an empty'}));
  justEmpty$ = Observable.of(null);
  error$ = Observable.of({title: 'will be an error'})
    .concat(Observable.timer(4000).mapTo({title: 'this title will not be seen'}))
    .concat(Observable.throw('some error'));
  replace$ = Observable.of({title: 'observable will be replaced on button click'});
  replaceWithNull$ = Observable.of({title: 'observable will be replaced on button click with null'});

  public replaceObservable() {
    this.replace$ = Observable.of({title: 'we replaced this observable at ' + new Date().toTimeString()});
  }

  public replaceObservableWithNull() {
    this.replaceWithNull$ = null;
  }
}
