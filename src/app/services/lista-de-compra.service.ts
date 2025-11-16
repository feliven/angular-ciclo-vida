import { Injectable } from '@angular/core';

import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ListaDeCompraService {
  private listaDeComprasMockada: Item[] = [
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

  private listaDeCompras: Item[] = JSON.parse(
    localStorage.getItem('itens') || '[]'
  );

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
    // this.atualizarLocalStorage();
  }

  getItemLista(id: number): Item | undefined {
    const itemDoID = this.listaDeCompras.find((item) => item.id === id);
    if (itemDoID) {
      return itemDoID;
    }
    return undefined;
  }

  editItemLista(itemAntigo: Item, nomeAtualizado: string) {
    const itemAtualizado: Item = {
      id: itemAntigo.id,
      nome: nomeAtualizado,
      data: itemAntigo.data,
      comprado: itemAntigo.comprado,
    };

    const indice = this.listaDeCompras.indexOf(itemAntigo);
    this.listaDeCompras.splice(indice, 1, itemAtualizado);

    // this.atualizarLocalStorage();
  }

  deleteItemLista(id: number): void {
    const itemDoID = this.getItemLista(id);

    if (itemDoID) {
      const indice = this.listaDeCompras.indexOf(itemDoID);
      this.listaDeCompras.splice(indice, 1);
    }

    console.log(this.listaDeCompras);

    // this.atualizarLocalStorage();
  }

  atualizarLocalStorage() {
    localStorage.setItem('itens', JSON.stringify(this.listaDeCompras));
  }
}
