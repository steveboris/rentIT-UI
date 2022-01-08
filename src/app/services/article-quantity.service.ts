import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleQuantity } from '../models/ArticleQuantity';

@Injectable({
  providedIn: 'root'
})
export class ArticleQuantityService {

  apiUrl: String;

  header: HttpHeaders = new HttpHeaders(
    {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  );

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl + "/quantities"
  }

  public getOne(id: number): Observable<any> {
    
    return this.http.get<ArticleQuantity>(`${this.apiUrl}/${id}`, {headers: this.header});
  }

  public return(ids: { ids: number[]; }): Observable<any> {
    
    return this.http.post<ArticleQuantity>(`${this.apiUrl}/return`,ids, {headers: this.header});
  }

  public addOne(quantity: any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}`,quantity, {headers: this.header});
  }
}
