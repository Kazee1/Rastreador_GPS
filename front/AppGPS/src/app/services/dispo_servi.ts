import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DispositivoData {
  nome: string;
  local: string;
  responsavel: string;
}

@Injectable({
  providedIn: 'root',
})
export class DispositivoService {

  private apiUrl = 'http://localhost:3000/api'; // seu backend

  constructor(private http: HttpClient) {}

  registrarDispositivo(data: DispositivoData): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.post(`${this.apiUrl}/dispositivo/registrar`, data,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  conectarDispositivo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dispositivo/conectar`);
  }
}
