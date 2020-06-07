import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnpaidSumService {

  constructor(private http: HttpClient) { }

  getUnpaidSum(name: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/check/unpaid/'+name);
    
}

}
