import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import { Price } from '../price-list/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private http: HttpClient,private store:StoreService) { }

  get prices$(){
    return this.store.select(state =>
      state.priceList.items);
  }

  get p_sum$(){
    return this.store.select(state =>
      state.p_sum);
  }

  
  get q_sum$(){
    return this.store.select(state =>
      state.q_sum);
  }

  updateprice$(index:number,value:number){
    let p_sum=0;
    let q_sum=0;
    this.store.update((state)=>{
      state.priceList.items[index].freq=value;
      
      for(let i=0;i<state.priceList.items.length;i++){
        p_sum+=(state.priceList.items[i].price)*(state.priceList.items[i].freq);
        q_sum+=state.priceList.items[i].freq;
        }
      
        return ({p_sum:p_sum,q_sum:q_sum,priceList:{items:state.priceList.items}})
    });
  }

  resetprice$(){
    this.store.update((state)=>{
      for(let i=0;i<state.priceList.items.length;i++){
      state.priceList.items[i].freq=0;
      }
      return ({p_sum:0,q_sum:0,priceList:{items:state.priceList.items}})
    });
  }



  getPriceList(): void {
    const prices= this.http.get<Price[]>(environment.apiUrl + '/price');
    prices.subscribe((price)=>{
      this.store.update((state)=>({...state,priceList:{...state.priceList,items:price}}));
    });
}

}
