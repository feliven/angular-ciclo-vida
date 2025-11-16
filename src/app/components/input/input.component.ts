import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ListaDeCompraService } from '../../services/lista-de-compra.service';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnChanges {
  itemParaEditar = input<Item>();

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['itemParaEditar'].previousValue);
    console.log(changes['itemParaEditar'].currentValue);
    console.log(changes['itemParaEditar'].isFirstChange());

    if (changes['itemParaEditar']) {
      this.nomeItem = this.itemParaEditar()?.nome ?? '';
    }
  }
}
