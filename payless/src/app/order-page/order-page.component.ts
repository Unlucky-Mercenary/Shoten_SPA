import { Component, OnInit,OnDestroy, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimeBackService} from '../service/time-back.service';
import { OrderPageUsecaseService } from '../service/order-page-usecase.service';
import { PriceService } from '../service/price.service';
import { Subscription, fromEvent } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnDestroy,OnInit {

  member$= this.orderPageUsecase.member$;

  private onDestroy$ = new EventEmitter();
  private click$ = fromEvent(document, 'click');
  private event:Subscription;

  constructor(private route: ActivatedRoute,private timeBackService: TimeBackService
    ,private orderPageUsecase:OrderPageUsecaseService,private priceservice: PriceService) { 
     this.orderPageUsecase.subscribeRouteChanges(this.route,this.onDestroy$,this.timeBackService,this.priceservice);
      this.event=this.timeBackService.pageChangeWait(this.click$);
    }

  ngOnDestroy(): void{
    this.onDestroy$.complete();
    this.event.unsubscribe();
    console.log("デストロイ！");
  }

  ngOnInit():void{
    
  }

  goBack(): void {
    this.timeBackService.pageChange();
  }

}
