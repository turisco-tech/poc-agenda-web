import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Contato } from '../models/contato.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root' // Garante que existe apenas uma instância desse serviço rodando (Singleton)
})
export class ContatoService {
  
  // URL da API. Se for testar contra a nuvem, troque o localhost pelo IP da AWS
  private apiUrl = `${environment.apiPrincipalUrl}/api/contatos`;

  // 1. Criamos o "rádio comunicador" invisível
  private contatoModificadoSource = new Subject<void>();
  
  // 2. Expomos o rádio para os componentes ouvirem
  contatoModificado$ = this.contatoModificadoSource.asObservable();

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  criar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato).pipe(
      // Avisa no rádio que um contato foi criado
      tap(() => this.contatoModificadoSource.next()) 
    );
  }

  atualizar(id: string, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato).pipe(
      // Avisa no rádio que um contato foi atualizado
      tap(() => this.contatoModificadoSource.next())
    );
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      // Avisa no rádio que um contato foi deletado
      tap(() => this.contatoModificadoSource.next())
    );
  }
}