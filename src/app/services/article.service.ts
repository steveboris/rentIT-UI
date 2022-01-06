import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl: string;

  header: HttpHeaders = new HttpHeaders(
    {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  );

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl + "/articles"
  }

  public getOne(id: number): Observable<any> {
    
    return this.http.get<Article>(`${this.apiUrl}/${id}`, {headers: this.header});
  }
}
