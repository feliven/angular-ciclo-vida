import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ListaDeCompraService } from '../../services/lista-de-compra.service';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  nomeItem!: string;

  constructor(private listaService: ListaDeCompraService) {}

  adicionarItem() {
    console.log(this.nomeItem);
    this.listaService.setItemLista(this.nomeItem);
    this.limparCampo();
  }

  limparCampo(): void {
    this.nomeItem = '';
  }
}
