import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../services/models';

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

  // Zeigt die rechte Sidebar an, wenn eine Unterroute aktiv ist (create / edit).
  sidebarOpen = false;

  constructor() {
    // Beobachtet Router-Änderungen, um zu wissen wann eine Sub-Route (create/edit) aktiv ist.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        this.sidebarOpen = url.includes('/calender/create') || url.includes('/calender/edit');
      }
    });
  }

  ngOnInit() {
    this.generateCalendar();
    // Initial-Check (falls Seite direkt mit Subroute geladen wird).
    const url = this.router.url;
    this.sidebarOpen = url.includes('/calender/create') || url.includes('/calender/edit');
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
    this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + offset, 1);
    this.generateCalendar();
  }

  goToToday() {
    this.displayDate = new Date();
    this.generateCalendar();
  }

  // Gibt die aktiven ToDos für einen Tag zurück (erledigte sind raus).
  getTodosForDay(day: Date): Todo[] {
    const iso = this.toIsoDate(day);
    return this.todoService.activeTodos().filter(t => t.date === iso);
  }

  isToday(day: Date): boolean {
    return day.toDateString() === new Date().toDateString();
  }

  isCurrentMonth(day: Date): boolean {
    return day.getMonth() === this.displayDate.getMonth();
  }

  // Klick auf eine Tages-Zelle öffnet das Create-Formular mit vorbelegtem Datum.
  createForDay(day: Date) {
    const iso = this.toIsoDate(day);
    this.router.navigate(['/calender/create'], { queryParams: { date: iso } });
  }

  // Klick auf ein ToDo-Pill öffnet den Edit-Modus.
  editTodo(todo: Todo, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/calender/edit', todo.id]);
  }

  private toIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
