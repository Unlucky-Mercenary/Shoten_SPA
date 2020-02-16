import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MemberService } from './../service/member.service';
import { Member } from './../members/member';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  members:Member[];
  selectedMember:Member;
  ngOnInit(){
    this.getMemberList();
  }

  getMemberList(): void {
    this.memberService.getMemberList()
      .subscribe(res => {
        this.members= res;
      });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private memberService:MemberService) {}

}
