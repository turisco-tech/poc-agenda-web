import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contato } from '../../../../core/models/contato.model';

@Component({
  selector: 'app-contato-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contato-list.component.html'
})
export class ContatoListComponent {
  // O @Input avisa que essa variável vem de fora (do componente pai)
  @Input() contatos: Contato[] = [];
  // Os @Outputs avisam que vamos emitir eventos para fora
  @Output() editar = new EventEmitter<Contato>();
  @Output() deletar = new EventEmitter<string>();
}