import { Component, OnInit, Input } from '@angular/core';
import { OrderHistoryService } from 'src/app/service/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  @Input() selected;
  @Input() name;
  orders$=this.orderHistoryService.orders$;
  columnsToDisplay = ['order_id', 'date','price'];


  constructor(private orderHistoryService:OrderHistoryService) {
    
    this.orderHistoryService.getOrderHistory(this.name,this.selected); 
  }

  

  ngOnInit(): void {
    console.log(this.name);
    console.log(this.selected);
  }


}
