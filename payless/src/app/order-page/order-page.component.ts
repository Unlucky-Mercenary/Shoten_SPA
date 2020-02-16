import { Component, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Member} from '../members/member';
import {TimeBackService} from '../service/time-back.service'
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit,OnChanges {
  private timeout=300000;
  member: Member;
  BackCounter = interval(this.timeout);

  constructor(private route: ActivatedRoute,
    private location: Location,private timeBackService: TimeBackService) { }

  ngOnInit(): void {
    this.getMember();
    this.BackCounter.subscribe(()=> this.timeBackService.pageChange());
  }
  ngOnChanges(): void{
    this.getMember();
  }

  getMember(): void {
    //this.member.name=this.route.snapshot.paramMap.get('name');
    const { snapshot } = this.route;
    this.member={"name":snapshot.params.name}; 
  }
  goBack(): void {
    this.timeBackService.pageChange();
  }

}
