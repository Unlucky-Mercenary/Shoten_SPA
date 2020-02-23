import { Component, OnInit,Input} from '@angular/core';
import {PriceService} from './../service/price.service'
import {Price} from './price'
import { OrderPageUsecaseService } from '../service/order-page-usecase.service';
import { MatSlider } from '@angular/material/slider';
import {MatSliderHarness} from '@angular/material/slider/testing';


@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  member$= this.orderPageUsecase.member$;

  prices: Price[];
  min="0";
  max="10";
  step="1";
  value=0; 
  thumbLabel=true;
  tickInterval="1";
  p_sum=0;
  q_sum=0;

  obj={
  };
  

  constructor(private priceService : PriceService,private orderPageUsecase:OrderPageUsecaseService) { 
    
  }

  updateSetting(event,price:number) {
    this.obj[price] = event.value;
    this.p_sum=0;
    this.q_sum=0;
    for (var i=0;i<this.prices.length;i++){
      this.p_sum += this.prices[i].price*this.obj[this.prices[i].price];
      this.q_sum += this.obj[this.prices[i].price];
    }
  }

  getValue(){
    return this.value;
  }

  reset(){
    this.p_sum=0;
    this.q_sum=0;
    this.value=0;
  }

  ngOnInit(): void {
    this.priceService.getPriceList().subscribe(prices=>{
      for (var i=0;i<prices.length;i++){
        this.obj[prices[i].price]=0;
      }
      this.prices=prices;
    }
      );
    
  }

}
