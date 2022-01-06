import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rental } from '../models/Rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl: String;

  header: HttpHeaders = new HttpHeaders(
    {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  );

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl + "/rentals"
  }

  public getOne(id: number): Observable<any> {
    
    return this.http.get<Rental>(`${this.apiUrl}/${id}`, {headers: this.header});
  }
}
