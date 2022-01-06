import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SigninRequest } from 'src/app/models/SigninRequest';
import { SignupRequest } from 'src/app/models/SignupRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: String;

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.apiUrl + "/auth"
  }

  public signUp(request: SignupRequest): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/signup`, request);
  }

  public signIn(request: SigninRequest): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/signin`, request);
  }
}
