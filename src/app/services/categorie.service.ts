import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  apiUrl: string;

  header: HttpHeaders = new HttpHeaders(
    {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  );

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl + "/categories"
  }

  public getOne(id: number): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers: this.header});
  }

  public getAll(): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}`, {headers: this.header});
  }
}
