import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatoService } from '../../core/services/contato.service';
import { Contato } from '../../core/models/contato.model';
import { ContatoListComponent } from './components/contato-list/contato-list.component';
import { ContatoFormComponent } from './components/contato-form/contato-form.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [CommonModule, ContatoListComponent, ContatoFormComponent],
  template: `
    <div class="container">
      <h1>Minha Agenda</h1>
      <app-contato-form 
        [contato]="contatoSelecionado" 
        (salvar)="salvar($event)" 
        (cancelar)="limpar()">
      </app-contato-form>
      
      <app-contato-list 
        [contatos]="contatos" 
        (editar)="editar($event)" 
        (deletar)="deletar($event)">
      </app-contato-list>
    </div>
  `
})
export class ContatosComponent implements OnInit {
  contatos: Contato[] = [];
  contatoSelecionado: Contato = { nome: '', email: '' };

  constructor(private service: ContatoService) { }

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.service.listarTodos().subscribe({
      next: (data) => {
        console.log('✅ GET /contatos finalizado. Dados recebidos:', data);
        // O "|| []" protege o Angular caso a API devolva um null acidentalmente
        this.contatos = data || []; 
      },
      error: (err) => console.error('❌ Erro gravíssimo no GET da lista:', err)
    });
  }

  salvar(contato: Contato) {
    console.log('🚀 Iniciando POST/PUT para a API:', contato);

    if (contato.id) {
      this.service.atualizar(contato.id, contato)
        .pipe(finalize(() => {
            console.log('🔄 Finalize acionado no PUT. Buscando lista atualizada...');
            this.carregarContatos();
        }))
        .subscribe({
          next: (resposta) => console.log('🟢 Sucesso Absoluto no PUT:', resposta),
          error: (err) => console.error('🔴 A API recusou o PUT:', err)
        });
    } else {
      this.service.criar(contato)
        .pipe(finalize(() => {
            console.log('🔄 Finalize acionado no POST. Buscando lista atualizada...');
            this.carregarContatos();
        }))
        .subscribe({
          next: (resposta) => console.log('🟢 Sucesso Absoluto no POST:', resposta),
          error: (err) => console.error('🔴 A API recusou o POST:', err)
        });
    }
    this.limpar();
  }

  editar(contato: Contato) {
    this.contatoSelecionado = { ...contato };
  }

  deletar(id: string) {
    console.log(`🗑️ Solicitando exclusão do ID: ${id}`);
    this.service.deletar(id)
      .pipe(finalize(() => this.carregarContatos()))
      .subscribe({
        next: () => console.log('🟢 Exclusão confirmada pela API!'),
        error: (err) => console.error('🔴 A API recusou o DELETE:', err)
      });
  }

  limpar() {
    this.contatoSelecionado = { nome: '', email: '' };
  }
}