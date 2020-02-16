import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TimeBackService {

  constructor(private location: Location,private router: Router) { }

  pageChange(): void {
    this.router.navigateByUrl('/');
  }
}
