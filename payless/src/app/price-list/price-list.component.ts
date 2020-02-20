import { Component, OnInit } from '@angular/core';
import {PriceService} from './../service/price.service'
import {Price} from './price'

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  
  prices: Price[];
  constructor(private priceService : PriceService) { }

  ngOnInit(): void {
    this.priceService.getPriceList().subscribe(prices=>this.prices=prices);
  }

}
