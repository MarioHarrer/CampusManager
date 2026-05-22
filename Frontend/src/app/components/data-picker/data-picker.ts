import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Datepicker-Widget wie in Image 1 des Figma-Designs.
 * Kann entweder inline gerendert werden oder als Popover aus einem Input
 * heraus (siehe "inline"-Input).
 *
 * Verwendung:
 *   <app-data-picker [value]="selectedDate" (valueChange)="selectedDate = $event" />
 */
@Component({
  selector: 'app-data-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-picker.html',
  styleUrl: './data-picker.css',
})
export class DataPickerComponent implements OnInit {
  /** Ausgewählter Wert im ISO-Format YYYY-MM-DD. */
  @Input() value: string | null = null;

  /** Wird ausgelöst, wenn der Nutzer ein Datum auswählt. */
  @Output() valueChange = new EventEmitter<string>();

  /** Wenn true, wird der Datepicker dauerhaft angezeigt (nicht als Popover). */
  @Input() inline: boolean = false;

  viewDate: Date = new Date();
  days: Date[] = [];
  weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  isOpen = false;

  ngOnInit() {
    if (this.value) {
      const parsed = new Date(this.value);
      if (!isNaN(parsed.getTime())) {
        this.viewDate = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
      }
    }
    this.generateDays();
  }

  toggle() {
    if (this.inline) return;
    this.isOpen = !this.isOpen;
  }

  changeMonth(offset: number) {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + offset, 1);
    this.generateDays();
  }

  selectDay(day: Date) {
    const iso = this.toIso(day);
    this.value = iso;
    this.valueChange.emit(iso);
    if (!this.inline) this.isOpen = false;
  }

  cancel() {
    this.isOpen = false;
  }

  confirm() {
    if (this.value) this.valueChange.emit(this.value);
    this.isOpen = false;
  }

  isSelected(day: Date): boolean {
    if (!this.value) return false;
    return this.toIso(day) === this.value;
  }

  isToday(day: Date): boolean {
    return day.toDateString() === new Date().toDateString();
  }

  isCurrentMonth(day: Date): boolean {
    return day.getMonth() === this.viewDate.getMonth();
  }

  get formattedValue(): string {
    if (!this.value) return 'Datum wählen';
    const d = new Date(this.value);
    return d.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  private generateDays() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const result: Date[] = [];
    for (let i = startDay; i > 0; i--) {
      result.push(new Date(year, month, 1 - i));
    }
    for (let i = 0; i < 42 - startDay; i++) {
      result.push(new Date(year, month, 1 + i));
    }
    this.days = result;
  }

  private toIso(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
