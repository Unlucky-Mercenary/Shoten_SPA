import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) { }

  getMemberList(): Observable<any> {
    return this.http.get(environment.apiUrl + '/members');
}

}
