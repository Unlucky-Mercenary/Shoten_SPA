import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderHistory } from '../dashboard/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  constructor(private http: HttpClient) { }

  private _orders$ = new BehaviorSubject<OrderHistory[]>([]);

  get orders$(){
    return this._orders$.asObservable();
  }

  getOrderHistory(name:string,date:string): void {
    this.http.get<OrderHistory[]>(environment.apiUrl + '/order/'+name+'/date/'+date)
    .subscribe(orders=>{
      this._orders$.next(orders)
    });
}
}
