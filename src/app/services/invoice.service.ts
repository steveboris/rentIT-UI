import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  apiUrl: string;

  header: HttpHeaders = new HttpHeaders(
    {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  );

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl + "/invoices"
  }

  public getOne(id: number): Observable<any> {
    
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`, {headers: this.header});
  }
}
