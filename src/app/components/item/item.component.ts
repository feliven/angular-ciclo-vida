import { Component, input } from '@angular/core';
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
export class ItemComponent {
  item = input<Item>();

  faPen = faPen;
  faTrash = faTrash;
}
