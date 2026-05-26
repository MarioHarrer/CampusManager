import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { TodoType } from '../../services/models';
import { DataPickerComponent } from '../data-picker/data-picker';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DataPickerComponent],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.css'
})
export class CreateTodoComponent implements OnInit {
  private todoService = inject(TodoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Formularmodell.
  form = {
    title: '',
    description: '',
    date: '' as string,
    time: '',
    type: 'blue' as TodoType,
  };

  submitted = false;

  readonly typeOptions: { value: TodoType; label: string; color: string }[] = [
    { value: 'blue',   label: 'Schule',   color: '#4a90e2' },
    { value: 'orange', label: 'Lernen',   color: '#f5a623' },
    { value: 'red',    label: 'Wichtig',  color: '#e25c5c' },
    { value: 'green',  label: 'Privat',   color: '#5cb85c' },
  ];

  ngOnInit() {
    // Optional: Datum aus Query-Param (wenn User im Kalender auf einen Tag klickt).
    const prefill = this.route.snapshot.queryParamMap.get('date');
    if (prefill) {
      this.form.date = prefill;
    } else {
      this.form.date = new Date().toISOString().slice(0, 10);
    }
  }

  setType(type: TodoType) {
    this.form.type = type;
  }

  save() {
    this.submitted = true;
    if (!this.form.title.trim() || !this.form.date) {
      return;
    }

    this.todoService.addTodo({
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      date: this.form.date,
      time: this.form.time,
      type: this.form.type,
    });

    this.router.navigate(['/calender']);
  }

  cancel() {
    this.router.navigate(['/calender']);
  }
}
