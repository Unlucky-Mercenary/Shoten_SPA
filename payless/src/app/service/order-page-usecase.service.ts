import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable,BehaviorSubject } from 'rxjs';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { Member } from '../members/member';
import { TimeBackService } from './time-back.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderPageUsecaseService {
  
  private _member$ = new BehaviorSubject<Member>(null);

  get member$(){
    return this._member$.asObservable();
  }


  subscribeRouteChanges(route: ActivatedRoute, untilObservable: Observable<any>,timeBackservice: TimeBackService) {
    route.params.pipe(    
    // コンポーネントの破棄と同時に停止する
        takeUntil(untilObservable),
        // paramsからnameを取り出す
        map(params => params['name']),
        // nameが変わったときだけ値を流す
        distinctUntilChanged(),
      ).subscribe(name => {
        console.log("よばれたよ");
        this._member$.next({"name":name}); 
        timeBackservice.pageChangeWait(environment.waitLongTime);
      }
      );
  }
}
