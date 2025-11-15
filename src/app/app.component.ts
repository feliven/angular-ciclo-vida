import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { InputComponent } from './components/input/input.component';
import { Item } from './interfaces/item.interface';
import { ListaDeCompraService } from './services/lista-de-compra.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ciclo-vida';

  listaDeCompras!: Item[];

  constructor(private listaService: ListaDeCompraService) {}

  ngOnInit(): void {
    this.listaDeCompras = this.listaService.getListaDeCompras();
    console.log(this.listaDeCompras);
  }
}
