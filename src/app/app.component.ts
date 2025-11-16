import { Component, input, OnInit, output } from '@angular/core';

import { InputComponent } from './components/input/input.component';
import { Item } from './interfaces/item.interface';
import { ListaDeCompraService } from './services/lista-de-compra.service';
import { ItemComponent } from './components/item/item.component';

@Component({
  selector: 'app-root',
  imports: [InputComponent, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ciclo-vida';

  listaDeCompras!: Item[];
  itemASerEditado!: Item;

  constructor(private listaService: ListaDeCompraService) {}

  ngOnInit(): void {
    this.listaDeCompras = this.listaService.getListaDeCompras();
    console.log(this.listaDeCompras);
  }

  editarItem(item: Item) {
    this.itemASerEditado = item;
  }

  apagarItem(id: number) {
    this.listaService.deleteItemLista(id);
  }
}
