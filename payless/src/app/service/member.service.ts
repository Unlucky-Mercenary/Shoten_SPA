import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject  } from 'rxjs';
import { Member } from '../members/member';


@Injectable({
  providedIn: 'root'
})

export class MemberService {
  constructor(private http: HttpClient) { }

  private _members$ = new BehaviorSubject<Member[]>([]);

  get members$(){
    return this._members$.asObservable();
  }

  getMemberList(): void {
    this.http.get<Member[]>(environment.apiUrl + '/members')
    .subscribe(members=>{
      this._members$.next(members)
    });
}

}
