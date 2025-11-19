import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api'; // seu backend

  constructor(private http: HttpClient) {}

  registrar(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  
}
