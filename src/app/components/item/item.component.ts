import { Component } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-item',
  imports: [FontAwesomeModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  standalone: true,
})
export class ItemComponent {
  faPen = faPen;
  faTrash = faTrash;
}
