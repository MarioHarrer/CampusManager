import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, CreateTodo, UpdateTodo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/todos';

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  findOne(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  create(todo: CreateTodo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  update(id: string, todo: UpdateTodo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
