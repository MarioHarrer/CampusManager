import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../services/models';

/**
 * Wiederverwendbares ToDo-Item (Checkbox + Titel + Löschen-Button).
 * Kann überall verwendet werden wo eine ToDo-Liste gerendert wird.
 */
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {
  @Input({ required: true }) todo!: Todo;
  @Input() showDelete = true;
  @Input() showTime   = true;

  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();
  @Output() edit   = new EventEmitter<Todo>();

  onToggle() {
    this.toggle.emit(this.todo);
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.todo);
  }

  onEdit() {
    this.edit.emit(this.todo);
  }
}
