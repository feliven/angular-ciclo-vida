import {
  Component,
  input,
  OnChanges,
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
export class ItemComponent implements OnChanges {
  item = input<Item>();
  itemASerEditado = output<Item>();
  idDoItemASerApagado = output<number>();

  faPen = faPen;
  faTrash = faTrash;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
  }

  editarItem() {
    const itemParaEnviar = this.item();
    if (itemParaEnviar) {
      this.itemASerEditado.emit(itemParaEnviar);
    }
  }

  apagarItem() {
    const idParaEnviar = this.item()?.id;
    if (idParaEnviar) {
      this.idDoItemASerApagado.emit(idParaEnviar);
    }
  }
}
