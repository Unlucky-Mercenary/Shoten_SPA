import { Component, OnInit,OnDestroy, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimeBackService} from '../service/time-back.service';
import { OrderPageUsecaseService } from '../service/order-page-usecase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  
  member$= this.orderPageUsecase.member$;



  constructor(private orderPageUsecase:OrderPageUsecaseService,private timeBackService: TimeBackService){}
  /*constructor(private route: ActivatedRoute,private timeBackService: TimeBackService
    ,private orderPageUsecase:OrderPageUsecaseService) { 
     this.orderPageUsecase.subscribeRouteChanges(this.route,this.onDestroy$,this.timeBackService);
    }*/

  ngOnDestroy(): void{
   
  }

  goBack(): void {
    this.timeBackService.pageChange();
  }

}
