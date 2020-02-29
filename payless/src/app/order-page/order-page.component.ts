import { Component, OnInit,OnDestroy, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimeBackService} from '../service/time-back.service';
import { OrderPageUsecaseService } from '../service/order-page-usecase.service';
import { PriceService } from '../service/price.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnDestroy {

  member$= this.orderPageUsecase.member$;

  private onDestroy$ = new EventEmitter();

  constructor(private route: ActivatedRoute,private timeBackService: TimeBackService
    ,private orderPageUsecase:OrderPageUsecaseService,private priceservice: PriceService) { 
     this.orderPageUsecase.subscribeRouteChanges(this.route,this.onDestroy$,this.timeBackService,this.priceservice);
    }

  ngOnDestroy(): void{
    this.onDestroy$.complete();
    console.log("デストロイ！");
    
  }

  goBack(): void {
    this.timeBackService.pageChange();
  }

}
