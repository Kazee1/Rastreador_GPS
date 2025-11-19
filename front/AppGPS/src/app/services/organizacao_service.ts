import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrganizacaoData {
  nome: string;
  local: string;
  responsavel: string;
  codigo: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrganizacaoService {

  private apiUrl = 'http://localhost:3000/api'; // backend

  constructor(private http: HttpClient) {}

  registrarOrganizacao(data: OrganizacaoData): Observable<any> {
    return this.http.post(`${this.apiUrl}/organizacao`, data);
  }

  verificarCodigo(codigo: string): Observable<any> {
  const token = localStorage.getItem("token");

  return this.http.post(
    `${this.apiUrl}/organizacao/verificar`,
    { codigo },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
}
