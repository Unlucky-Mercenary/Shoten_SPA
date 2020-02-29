import { Component, OnInit,Input, OnDestroy} from '@angular/core';
import {PriceService} from './../service/price.service'
import {Price} from './price'
import { OrderPageUsecaseService } from '../service/order-page-usecase.service';
import { MatSlider } from '@angular/material/slider';
import {MatSliderHarness} from '@angular/material/slider/testing';
import { StoreService } from '../service/store.service';


@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  member$= this.orderPageUsecase.member$;
  prices$= this.priceService.prices$;
  p_sum$=this.priceService.p_sum$;
  q_sum$=this.priceService.q_sum$;

  min="0";
  max="10";
  step="1";
  value=0; 
  thumbLabel=true;
  tickInterval="1";
  

  obj={
  };
  

  constructor(private priceService : PriceService,private orderPageUsecase:OrderPageUsecaseService) { 
    
  }

  updateSetting(event,index) {
    this.priceService.updateprice$(index,event.value);
  }

  getValue(){
    return this.value;
  }

  reset(){
    this.priceService.resetprice$();
  }

  ngOnInit(): void {
    this.priceService.getPriceList();
  }

  

}
