import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: String;

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl + "/users"
  }

  public getOne(id: number): Observable<any> {
    
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

}
