import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ListaDeCompraService } from '../../services/lista-de-compra.service';
import { Item } from '../../interfaces/item.interface';

enum textoBotaoSalvar {
  SALVAR_ITEM = 'Salvar item',
  SALVAR_EDICOES = 'Salvar edições',
}

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnChanges {
  nomeItem!: string;

  itemParaEditar = input<Item>();
  modoEdicao = false;
  textoBotao = textoBotaoSalvar.SALVAR_ITEM;

  constructor(private listaService: ListaDeCompraService) {}

  adicionarItem() {
    console.log(this.nomeItem);
    this.listaService.setItemLista(this.nomeItem);
    this.limparCampo();
  }

  editarItem() {
    const itemParaEditar = this.itemParaEditar();
    itemParaEditar
      ? this.listaService.editItemLista(itemParaEditar, this.nomeItem)
      : '';
    this.limparCampo();
    this.modoEdicao = false;
    this.textoBotao = textoBotaoSalvar.SALVAR_ITEM;
  }

  limparCampo(): void {
    this.nomeItem = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['itemParaEditar'].previousValue);
    console.log(changes['itemParaEditar'].currentValue);
    console.log(changes['itemParaEditar'].isFirstChange());

    if (!changes['itemParaEditar'].isFirstChange()) {
      this.modoEdicao = true;
      this.textoBotao = textoBotaoSalvar.SALVAR_EDICOES;
      this.nomeItem = this.itemParaEditar()?.nome ?? '';
    }
  }
}
