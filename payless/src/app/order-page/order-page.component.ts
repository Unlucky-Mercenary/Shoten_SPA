import { Component, OnInit,OnDestroy, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimeBackService} from '../service/time-back.service';
import { OrderPageUsecaseService } from '../service/order-page-usecase.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnDestroy {

  member$= this.orderPageUsecase.member$;

  private onDestroy$ = new EventEmitter();

  constructor(private route: ActivatedRoute,private timeBackService: TimeBackService
    ,private orderPageUsecase:OrderPageUsecaseService) { 
     this.orderPageUsecase.subscribeRouteChanges(this.route,this.onDestroy$,this.timeBackService);
    }

  ngOnDestroy(): void{
    this.onDestroy$.complete();
    console.log("デストロイ！");
    
  }

  goBack(): void {
    this.timeBackService.pageChange();
  }

}
