import { Component, OnInit } from '@angular/core';
import { MemberService } from './../service/member.service';
import { Member } from './member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members:Member[];
  constructor(private memberService:MemberService) { }
  
  ngOnInit(){
    this.getMemberList();
  }

  getMemberList(): void {
    this.memberService.getMemberList()
      .subscribe(res => {
        this.members= res;
      });
  }

}
