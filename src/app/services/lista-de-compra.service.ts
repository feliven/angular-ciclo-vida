import { Injectable } from '@angular/core';

import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ListaDeCompraService {
  private listaDeCompras: Item[] = [
    {
      id: 1,
      nome: 'Queijo prato',
      data: 'Segunda-feira (31/10/2022) às 08:30',
      comprado: false,
    },
    {
      id: 2,
      nome: 'Leite integral',
      data: 'Segunda-feira (31/10/2022) às 08:30',
      comprado: false,
    },
    {
      id: 3,
      nome: 'Mamão papaia',
      data: 'Segunda-feira (31/10/2022) às 08:30',
      comprado: true,
    },
  ];

  constructor() {
    console.log('Instanciando dependências necessárias para o serviço.');
  }

  getListaDeCompras(): Item[] {
    return this.listaDeCompras;
  }

  criarItem(nomeItem: string): Item {
    const novoID = this.listaDeCompras.length + 1;
    const item: Item = {
      id: novoID,
      nome: nomeItem,
      data: new Date().toLocaleString('pt-br'),
      comprado: false,
    };
    return item;
  }

  setItemLista(nomeItem: string): void {
    const novoItem = this.criarItem(nomeItem);
    this.listaDeCompras.push(novoItem);
  }
}
