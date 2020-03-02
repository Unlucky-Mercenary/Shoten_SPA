import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { takeWhile, takeUntil, delay, throttleTime, switchMapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TimeBackService {
 
  constructor(private location: Location,private router: Router) { }

  pageChangeWait(events: Observable<any>): Subscription {
    //console.log("よばれたよ")
    return events.pipe(switchMapTo(timer(environment.waitLongTime))).subscribe(
    (x)=> {
      this.router.navigateByUrl('/');
      //console.log(x);
    }
    );
  }

  

  pageChangeInitial():void{
    //return this.intervallTimer.subscribe(()=> this.router.navigateByUrl('/'));
  }

  pageChange(): void {
    this.router.navigateByUrl('/');
  }
}
