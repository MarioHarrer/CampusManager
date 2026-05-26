import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../services/todo.model';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.css',
})
export class EditTodoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);

  todo: Partial<Todo> = {
    name: '',
    description: '',
    date: '',
  };

  loading = false;
  saving = false;
  errorMessage = '';
  private id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.errorMessage = 'Keine ID in der URL.';
      return;
    }

    this.loading = true;
    this.todoService.findOne(this.id).subscribe({
      next: (todo) => {
        this.loading = false;
        // Datum für <input type="date"> auf yyyy-mm-dd kürzen
        this.todo = {
          ...todo,
          date: todo.date ? todo.date.substring(0, 10) : '',
        };
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Todo konnte nicht geladen werden.';
        console.error(err);
      },
    });
  }

  saveChanges() {
    if (!this.id) return;
    this.saving = true;
    this.errorMessage = '';

    this.todoService
      .update(this.id, {
        name: this.todo.name,
        description: this.todo.description,
        date: this.todo.date,
      })
      .subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/calender']);
        },
        error: (err) => {
          this.saving = false;
          this.errorMessage = 'Speichern fehlgeschlagen.';
          console.error(err);
        },
      });
  }

  deleteTodo() {
    if (!this.id) return;
    if (!confirm('Dieses Todo wirklich löschen?')) return;

    this.todoService.remove(this.id).subscribe({
      next: () => this.router.navigate(['/calender']),
      error: (err) => {
        this.errorMessage = 'Löschen fehlgeschlagen.';
        console.error(err);
      },
    });
  }
}
