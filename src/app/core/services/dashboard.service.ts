import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Interface espelhando o nosso Record do Java
export interface EstatisticaResponse {
  totalContatos: number;
  porDominio: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}:8082/api/estatisticas`;

  constructor(private http: HttpClient) { }

  // O pulo do gato: o timer(0, 3000) dispara imediatamente (0s) e depois a cada 3 segundos.
  // O switchMap cancela a requisição anterior se ela demorar e faz uma nova.
  obterEstatisticasEmTempoReal(): Observable<EstatisticaResponse> {
    return timer(0, 3000).pipe(
      switchMap(() => this.http.get<EstatisticaResponse>(this.apiUrl))
    );
  }
}