import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { WeatherService } from '../../services/weather.service';
import { Todo } from '../../services/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  todoService = inject(TodoService);
  weatherService = inject(WeatherService);

  // Wetter-Daten (Signal aus dem Service).
  weather = this.weatherService.weather;
  weatherLoading = this.weatherService.loading;

  // Heutige, noch offene ToDos.
  todayTodos = this.todoService.todayTodos;

  // Erledigte ToDos (bleiben bis zum Löschen in dieser Liste).
  doneTodos = this.todoService.doneTodos;

  // Zeigt nur die 6 nächstfolgenden nicht-heutigen ToDos als Previews.
  upcomingTodos = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.todoService
      .activeTodos()
      .filter(t => t.date > today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6);
  });

  toggleDone(todo: Todo): void {
    if (todo.done) {
      this.todoService.markUndone(todo.id);
    } else {
      this.todoService.markDone(todo.id);
    }
  }

  deleteDone(todo: Todo): void {
    this.todoService.deleteTodo(todo.id);
  }

  restoreDone(todo: Todo): void {
    this.todoService.markUndone(todo.id);
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('de-DE', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  }

  formatUpdatedAt(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  }
}
