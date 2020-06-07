import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State, initialState } from '../state';
import { map } from 'rxjs/operators';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _state$ = new BehaviorSubject<State>(initialState);

  update(fn: (state: State) => State) {
    const current = this._state$.value;
    this._state$.next(fn(current));
  }

  select<T>(selector: (state: State) => T) {
    //console.log(this._state$);
    return this._state$.pipe(
      map(selector),
    );
  }

}
