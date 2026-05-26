import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { CreateTodo } from '../../services/todo.model';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.css',
})
export class CreateTodoComponent {
  private todoService = inject(TodoService);
  private router = inject(Router);

  // Modell, das ans Formular gebunden ist
  todo: CreateTodo = {
    name: '',
    description: '',
    date: new Date().toISOString().substring(0, 10), // heute als yyyy-mm-dd
  };

  saving = false;
  errorMessage = '';

  save() {
    if (!this.todo.name || this.todo.name.length < 3) {
      this.errorMessage = 'Name muss mindestens 3 Zeichen lang sein.';
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    this.todoService.create(this.todo).subscribe({
      next: () => {
        this.saving = false;
        // Zurück zum Kalender, der lädt dann neu
        this.router.navigate(['/calender']);
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage =
          'Speichern fehlgeschlagen. Läuft das Backend auf Port 3000?';
        console.error(err);
      },
    });
  }
}
