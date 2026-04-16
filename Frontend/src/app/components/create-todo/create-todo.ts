import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.css'
})
export class CreateTodoComponent {}
