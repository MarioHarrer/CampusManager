import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../services/todo.model';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './calender.html',
  styleUrl: './calender.css'
})
export class CalenderComponent implements OnInit {
  private todoService = inject(TodoService);
  private router = inject(Router);

  displayDate: Date = new Date();
  days: Date[] = [];
  weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Echte Todos aus dem Backend
  todos: Todo[] = [];

  ngOnInit() {
    this.generateCalendar();
    this.loadTodos();

    // Nach jeder Navigation (z.B. nach create/edit) Liste neu laden
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.loadTodos());
  }

  loadTodos() {
    this.todoService.findAll().subscribe({
      next: (todos) => (this.todos = todos),
      error: (err) => {
        console.error('Konnte Todos nicht laden:', err);
        this.todos = [];
      },
    });
  }

  generateCalendar() {
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    let startDay = firstDayOfMonth.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const daysArray: Date[] = [];

    for (let i = startDay; i > 0; i--) {
      daysArray.push(new Date(year, month, 1 - i));
    }
    for (let i = 0; i < 42 - startDay; i++) {
      daysArray.push(new Date(year, month, 1 + i));
    }

    this.days = daysArray;
  }

  changeMonth(offset: number) {
    this.displayDate = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth() + offset,
      1,
    );
    this.generateCalendar();
  }

  getTodosForDay(day: Date): Todo[] {
    return this.todos.filter((t) => {
      if (!t.date) return false;
      const td = new Date(t.date);
      return (
        td.getDate() === day.getDate() &&
        td.getMonth() === day.getMonth() &&
        td.getFullYear() === day.getFullYear()
      );
    });
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }

  isCurrentMonth(day: Date): boolean {
    return day.getMonth() === this.displayDate.getMonth();
  }
}
