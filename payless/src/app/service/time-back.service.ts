import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimeBackService {
 
  constructor(private location: Location,private router: Router) { }

  pageChangeWait(timeout:number): void {
    interval(timeout).subscribe(()=> this.router.navigateByUrl('/'));
  }

  pageChange(): void {
    this.router.navigateByUrl('/');
  }
}
