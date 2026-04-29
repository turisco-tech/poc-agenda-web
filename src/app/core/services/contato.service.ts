import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root' // Garante que existe apenas uma instância desse serviço rodando (Singleton)
})
export class ContatoService {
  
  // URL da API. Se for testar contra a nuvem, troque o localhost pelo IP da AWS
  private apiUrl = 'http://44.205.251.58:8080/api/contatos'; 

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  criar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  atualizar(id: string, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}