import { Component, OnInit,OnDestroy, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimeBackService} from '../service/time-back.service';
import { OrderPageUsecaseService } from '../service/order-page-usecase.service';
import { DatePipe } from '@angular/common';
import { GetDatesService } from '../service/get-dates.service';
import{Date} from './date'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy,OnInit {
  
  member$= this.orderPageUsecase.member$;
  dates: Date[]=new Array();
  selected:String;



  constructor(private orderPageUsecase:OrderPageUsecaseService,private timeBackService: TimeBackService
    ,private dateService:GetDatesService){
    }
  /*constructor(private route: ActivatedRoute,private timeBackService: TimeBackService
    ,private orderPageUsecase:OrderPageUsecaseService) { 
     this.orderPageUsecase.subscribeRouteChanges(this.route,this.onDestroy$,this.timeBackService);
    }*/

  ngOnDestroy(): void{
   
  }

  ngOnInit():void{
    this.dateService.getDates().subscribe((dates)=>{
      //console.log(dates[0]);
      this.selected=dates[0];
      for(let i=0;i<dates.length;i++){
        
      this.dates.push({value:dates[i],view:dates[i].substr(0,4)+'年'+dates[i].substr(4, 2)+'月'});
      
      //console.log(this.dates[i]);

      }
      
    });
  
  }
  goBack(): void {
    this.timeBackService.pageChange();
  }

}
