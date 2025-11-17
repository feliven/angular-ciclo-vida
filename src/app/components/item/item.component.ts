import { Component, input, OnDestroy, output } from '@angular/core';

import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item',
  imports: [FontAwesomeModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  standalone: true,
})
export class ItemComponent implements OnDestroy {
  item = input<Item>();
  itemASerEditado = output<Item>();
  itemParaMarcarDesmarcar = output<Item>();
  // itemEstaMarcado = false;
  idDoItemASerApagado = output<number>();

  faPen = faPen;
  faTrash = faTrash;

  constructor() {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('OnChanges');
  // }

  ngOnDestroy(): void {
    console.log('acabou pra mim');
  }

  editarItem() {
    const itemParaEnviar = this.item();
    if (itemParaEnviar) {
      this.itemASerEditado.emit(itemParaEnviar);
    }
  }

  marcarDesmarcar() {
    const item = this.item();
    if (!item) return;

    // this.itemEstaMarcado = !this.itemEstaMarcado;
    // Directly mutating the input signal's value is not recommended.
    // Instead, you should work with a copy of the item and emit that.

    const itemAtualizado = { ...item, comprado: !item.comprado };
    this.itemParaMarcarDesmarcar.emit(itemAtualizado);
  }

  apagarItem() {
    const idParaEnviar = this.item()?.id;
    if (idParaEnviar) {
      this.idDoItemASerApagado.emit(idParaEnviar);
    }
  }
}
