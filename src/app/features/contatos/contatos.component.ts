import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatoService } from '../../core/services/contato.service';
import { Contato } from '../../core/models/contato.model';
import { ContatoListComponent } from './components/contato-list/contato-list.component';
import { ContatoFormComponent } from './components/contato-form/contato-form.component';

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
    this.service.listarTodos().subscribe(data => this.contatos = data);
  }

  salvar(contato: Contato) {
    console.log('Dados recebidos do form:', contato); // Nossa lupa!

    if (contato.id) {
      this.service.atualizar(contato.id, contato).subscribe({
        next: () => this.carregarContatos(),
        error: (err) => console.error('Erro no PUT:', err)
      });
    } else {
      this.service.criar(contato).subscribe({
        next: () => this.carregarContatos(),
        error: (err) => console.error('Erro no POST:', err)
      });
    }
    this.limpar();
  }

  editar(contato: Contato) {
    this.contatoSelecionado = { ...contato };
  }

  deletar(id: string) {
    this.service.deletar(id).subscribe(() => this.carregarContatos());
  }

  limpar() {
    this.contatoSelecionado = { nome: '', email: '' };
  }
}