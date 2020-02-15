import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private http: HttpClient) { }

  getPriceList(): Observable<any> {
    return this.http.get(environment.apiUrl + '/price');
}

}
