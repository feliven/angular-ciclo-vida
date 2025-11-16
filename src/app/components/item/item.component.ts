import {
  Component,
  input,
  OnChanges,
  OnDestroy,
  output,
  SimpleChanges,
} from '@angular/core';

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
export class ItemComponent implements OnChanges, OnDestroy {
  item = input<Item>();
  itemASerEditado = output<Item>();
  itemParaMarcarDesmarcar = output<Item>();
  // itemEstaMarcado = false;
  idDoItemASerApagado = output<number>();

  faPen = faPen;
  faTrash = faTrash;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
  }

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
    if (item) {
      // this.itemEstaMarcado = !this.itemEstaMarcado;
      item.comprado = !item.comprado;
      this.itemParaMarcarDesmarcar.emit(item);
    }
  }

  apagarItem() {
    const idParaEnviar = this.item()?.id;
    if (idParaEnviar) {
      this.idDoItemASerApagado.emit(idParaEnviar);
    }
  }
}
