import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './calender.html',
  styleUrl: './calender.css'
})
export class CalenderComponent implements OnInit {
  displayDate: Date = new Date();
  days: Date[] = [];
  weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Mock-Daten für To-Dos (Später kommen diese aus deinem Backend Service)
  todos = [
    { date: new Date(2025, 9, 1), title: 'Quotes', type: 'blue' },
    { date: new Date(2025, 9, 1), title: 'Homework', type: 'orange' },
    { date: new Date(2025, 9, 10), title: 'Meeting', type: 'blue' },
    { date: new Date(2025, 9, 24), title: 'Gym', type: 'red' },
  ];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();

    // Erster Tag des Monats
    const firstDayOfMonth = new Date(year, month, 1);
    // Welcher Wochentag ist der 1. (0=So, 1=Mo...) -> Umrechnen auf Mo=0
    let startDay = firstDayOfMonth.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const daysArray: Date[] = [];

    // Tage des Vormonats zum Auffüllen
    for (let i = startDay; i > 0; i--) {
      daysArray.push(new Date(year, month, 1 - i));
    }

    // Tage des aktuellen Monats (max 42 Felder für 6 Wochen)
    for (let i = 0; i < 42 - startDay; i++) {
      daysArray.push(new Date(year, month, 1 + i));
    }

    this.days = daysArray;
  }

  changeMonth(offset: number) {
    this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + offset, 1);
    this.generateCalendar();
  }

  getTodosForDay(day: Date) {
    return this.todos.filter(t =>
      t.date.getDate() === day.getDate() &&
      t.date.getMonth() === day.getMonth() &&
      t.date.getFullYear() === day.getFullYear()
    );
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }

  isCurrentMonth(day: Date): boolean {
    return day.getMonth() === this.displayDate.getMonth();
  }
}
