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

  // localStorage.getItem('itens') could throw during JSON.parse() if data is corrupted
  private listaDeCompras: Item[] = (() => {
    try {
      return JSON.parse(localStorage.getItem('itens') || '[]');
    } catch {
      return [];
    }
  })();

  constructor() {
    console.log('Instanciando dependências necessárias para o serviço.');
  }

  getListaDeCompras(): Item[] {
    return this.listaDeCompras;
  }

  criarItem(nomeItem: string): Item {
    // const novoID = this.listaDeCompras.length + 1;
    //
    // This breaks when items are deleted.
    // If you have IDs [1,2,3] and delete ID 2,
    // the next item will be ID 3 (duplicate).

    const novoID =
      this.listaDeCompras.length > 0
        ? Math.max(...this.listaDeCompras.map((item) => item.id)) + 1
        : 1;

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
    const indice = this.listaDeCompras.indexOf(itemAntigo);

    if (indice === -1) {
      console.warn(`Item with ID ${itemAntigo.id} not found in list`);
      return;
    }

    const itemAtualizado: Item = {
      id: itemAntigo.id,
      nome: nomeAtualizado,
      data: itemAntigo.data,
      comprado: itemAntigo.comprado,
    };

    this.listaDeCompras.splice(indice, 1, itemAtualizado);
  }

  // editItemLista2() doesn't validate if item exists in array

  editItemLista2(itemAntigo: Item, nomeAtualizado: string) {
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

  marcarDesmarcarItem(item: Item) {
    const marcarOuDesmarcar = !item.comprado;

    console.log(marcarOuDesmarcar);

    const itemAtualizado: Item = {
      id: item.id,
      nome: item.nome,
      data: item.data,
      comprado: marcarOuDesmarcar,
    };

    const indice = this.listaDeCompras.indexOf(item);
    this.listaDeCompras.splice(indice, 1, itemAtualizado);
  }

  deleteItemLista(id: number): void {
    const indice = this.listaDeCompras.findIndex((item) => id === item.id);
    if (indice !== -1) {
      this.listaDeCompras.splice(indice, 1);
    }
  }

  // deleteItemLista2() doesn't check if item exists (could splice at -1)
  deleteItemLista2(id: number): void {
    const indice = this.listaDeCompras.findIndex((item) => id === item.id);
    this.listaDeCompras.splice(indice, 1);
  }

  deleteItemLista3(id: number): void {
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

  limparLista() {
    this.listaDeCompras = [];
    localStorage.clear();

    // When you call limparLocalStorage(), it clears localStorage,
    // but the listaDeCompras array in memory still contains the old data.
    // So when components read from the service, they're getting
    // the cached array, not the cleared localStorage.
  }
}
