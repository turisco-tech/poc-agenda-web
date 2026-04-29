import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DashboardService, EstatisticaResponse } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,         // 2. Declarar como standalone
  imports: [CommonModule],  // 3. Importar as diretivas do HTML
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  // O símbolo '$' no final do nome indica que a variável é um fluxo contínuo (Stream/Observable)
  estatisticas$: Observable<EstatisticaResponse>;

  constructor(private dashboardService: DashboardService) {
    this.estatisticas$ = this.dashboardService.obterEstatisticasEmTempoReal();
  }

  // Método auxiliar para o Angular iterar sobre o Map (dicionário) do Java
  obterDominios(porDominio: { [key: string]: number }): string[] {
    return Object.keys(porDominio || {});
  }
}