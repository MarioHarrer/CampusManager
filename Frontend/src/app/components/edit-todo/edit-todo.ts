import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoType } from '../../services/models';
import { DataPickerComponent } from '../data-picker/data-picker';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, DataPickerComponent],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.css'
})
export class EditTodoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);

  todoId: string | null = null;
  notFound = false;

  form = {
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'blue' as TodoType,
  };

  readonly typeOptions: { value: TodoType; label: string; color: string }[] = [
    { value: 'blue',   label: 'Schule',  color: '#4a90e2' },
    { value: 'orange', label: 'Lernen',  color: '#f5a623' },
    { value: 'red',    label: 'Wichtig', color: '#e25c5c' },
    { value: 'green',  label: 'Privat',  color: '#5cb85c' },
  ];

  ngOnInit() {
    this.todoId = this.route.snapshot.paramMap.get('id');
    if (!this.todoId) {
      this.notFound = true;
      return;
    }
    const todo = this.todoService.getById(this.todoId);
    if (!todo) {
      this.notFound = true;
      return;
    }
    this.form = {
      title: todo.title,
      description: todo.description,
      date: todo.date,
      time: todo.time,
      type: todo.type,
    };
  }

  setType(type: TodoType) {
    this.form.type = type;
  }

  save() {
    if (!this.todoId || !this.form.title.trim() || !this.form.date) return;
    this.todoService.updateTodo(this.todoId, {
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      date: this.form.date,
      time: this.form.time,
      type: this.form.type,
    });
    this.router.navigate(['/calender']);
  }

  markDone() {
    if (!this.todoId) return;
    this.todoService.markDone(this.todoId);
    this.router.navigate(['/calender']);
  }

  delete() {
    if (!this.todoId) return;
    if (!confirm('ToDo endgültig löschen?')) return;
    this.todoService.deleteTodo(this.todoId);
    this.router.navigate(['/calender']);
  }

  cancel() {
    this.router.navigate(['/calender']);
  }
}
