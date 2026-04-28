import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contato } from '../../../../core/models/contato.model';

@Component({
  selector: 'app-contato-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato-form.component.html'
})
export class ContatoFormComponent {
  @Input() contato: Contato = { nome: '', email: '' };
  @Output() salvar = new EventEmitter<Contato>();
  @Output() cancelar = new EventEmitter<void>();
}