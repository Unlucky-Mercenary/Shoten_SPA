import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderHistory } from '../dashboard/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetDatesService {
  constructor(private http: HttpClient) { }

  //private _dates$ = new BehaviorSubject<string[]>([]);

  

  getDates(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/dates');
}
}
