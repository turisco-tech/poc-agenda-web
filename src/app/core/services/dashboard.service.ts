import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // 1. Não se esqueça de importar o 'map'!
import { environment } from '../../../environments/environment';

export interface EstatisticaResponse {
  totalContatos: number;
  porDominio: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Ajuste a rota se necessário conforme seu environment
  private apiUrl = `${environment.apiDashboardUrl}/api/estatisticas`;

  constructor(private http: HttpClient) {}

  obterEstatisticasEmTempoReal(): Observable<EstatisticaResponse> {
    return timer(0, 3000).pipe(
      switchMap(() => this.http.get<EstatisticaResponse>(this.apiUrl)),
      // 2. O Operador Map intercepta a resposta para transformarmos o dado
      map((response: EstatisticaResponse) => {
        const dominiosLimpos: { [key: string]: number } = {};

        // 3. Varre as chaves sujas (ex: 'gmail_com') e recria com o ponto (ex: 'gmail.com')
        for (const [chaveSuja, quantidade] of Object.entries(response.porDominio)) {
          const chaveLimpa = chaveSuja.replace(/_/g, '.'); // Substitui todos os underlines por pontos
          dominiosLimpos[chaveLimpa] = quantidade;
        }

        // 4. Retorna a resposta com o objeto de domínios corrigido
        return {
          totalContatos: response.totalContatos,
          porDominio: dominiosLimpos
        };
      })
    );
  }
}