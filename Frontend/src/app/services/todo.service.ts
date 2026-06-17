import { Injectable, computed, inject, signal } from '@angular/core';
import { TodosService as ApiTodosService } from '../api';
import type {
  CreateTodoDto,
  Todo as ApiTodo,
  UpdateTodoDto,
} from '../api';
import { CreateTodo, Todo, TodoType, UpdateTodo } from './models';


@Injectable({ providedIn: 'root' })
export class TodoService {
  private api = inject(ApiTodosService);

  /** Roh-Liste aller ToDos im UI-Format. */
  private readonly _todos = signal<Todo[]>([]);
  readonly todos = this._todos.asReadonly();

  /** Nur offene (nicht erledigte) ToDos. */
  readonly activeTodos = computed(() => this._todos().filter(t => !t.done));

  /** Erledigte ToDos (für die "Erledigt"-Liste auf Home). */
  readonly doneTodos = computed(() => this._todos().filter(t => t.done));

  /** Heutige offene ToDos. */
  readonly todayTodos = computed(() => {
    const today = this.toIsoDate(new Date());
    return this.activeTodos()
      .filter(t => t.date === today)
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  });

  constructor() {
    this.reload();
  }


  /** Lädt alle ToDos vom Backend neu. */
  reload(): void {
    this.api.todosControllerFindAll().subscribe({
      next: (list) => {
        const mapped = (list ?? []).map(t => this.fromApi(t));
        this._todos.set(mapped);
      },
      error: (err) => {
        // Wenn (z.B. nicht eingeloggt / Backend down) ein Fehler kommt,
        // bleiben wir mit leerer Liste — die UI zeigt dann einfach "leer".
        console.error('[TodoService] Failed to load todos', err);
      },
    });
  }

  /** Gibt ein ToDo anhand seiner ID zurück (aus dem lokalen Signal). */
  getById(id: string): Todo | undefined {
    return this._todos().find(t => t.id === id);
  }

  /** Legt ein neues ToDo an und aktualisiert den lokalen Store. */
  addTodo(input: CreateTodo): void {
    const dto = this.toCreateDto(input);
    this.api.todosControllerCreate(dto).subscribe({
      next: (created) => {
        this._todos.update(list => [...list, this.fromApi(created)]);
      },
      error: (err) => console.error('[TodoService] Failed to create', err),
    });
  }

  /** Aktualisiert ein ToDo. */
  updateTodo(id: string, patch: UpdateTodo): void {
    const current = this.getById(id);
    if (!current) return;
    const merged: Todo = { ...current, ...patch };
    const dto = this.toUpdateDto(merged);
    this.api.todosControllerUpdate(id, dto).subscribe({
      next: () => {
        this._todos.update(list =>
          list.map(t => (t.id === id ? merged : t)),
        );
      },
      error: (err) => console.error('[TodoService] Failed to update', err),
    });
  }

  /** Markiert ein ToDo als erledigt. */
  markDone(id: string): void {
    this.updateTodo(id, { done: true });
  }

  /** Hebt "erledigt" wieder auf. */
  markUndone(id: string): void {
    this.updateTodo(id, { done: false });
  }

  /** Löscht ein ToDo. */
  deleteTodo(id: string): void {
    this.api.todosControllerRemove(id).subscribe({
      next: () => {
        this._todos.update(list => list.filter(t => t.id !== id));
      },
      error: (err) => console.error('[TodoService] Failed to delete', err),
    });
  }

  // -------------------------------------------------------------------------
  // Mapping UI <-> API
  // -------------------------------------------------------------------------

  /** Backend-Entity -> UI-Modell. */
  private fromApi(api: ApiTodo): Todo {
    const { type, done, description } = this.parseMeta(api.description ?? '');
    return {
      id: api.id,
      title: api.name,
      description,
      date: this.extractIsoDate(api.date),
      time: this.extractIsoTime(api.startTime),
      type,
      done,
    };
  }

  /** UI -> CreateDto. */
  private toCreateDto(ui: CreateTodo): CreateTodoDto {
    const dateIso = ui.date; // YYYY-MM-DD
    const startIso = ui.time
      ? new Date(`${ui.date}T${ui.time}:00`).toISOString()
      : new Date(`${ui.date}T00:00:00`).toISOString();
    return {
      name: ui.title,
      description: this.buildMeta(ui.type, false) + (ui.description ?? ''),
      date: new Date(`${dateIso}T00:00:00`).toISOString(),
      startTime: startIso,
      endTime: startIso,
    };
  }

  /** UI -> UpdateDto. */
  private toUpdateDto(ui: Todo): UpdateTodoDto {
    const startIso = ui.time
      ? new Date(`${ui.date}T${ui.time}:00`).toISOString()
      : new Date(`${ui.date}T00:00:00`).toISOString();
    return {
      name: ui.title,
      description: this.buildMeta(ui.type, ui.done) + (ui.description ?? ''),
      date: new Date(`${ui.date}T00:00:00`).toISOString(),
      startTime: startIso,
      endTime: startIso,
    };
  }

  // -------------------------------------------------------------------------
  // Meta-Encoding (Type/Done) in die description hineinpacken
  // -------------------------------------------------------------------------

  private readonly META_RE = /^\[meta:type=(blue|orange|red|green);done=(0|1)\]\s?/;

  private buildMeta(type: TodoType, done: boolean): string {
    return `[meta:type=${type};done=${done ? 1 : 0}] `;
  }

  private parseMeta(raw: string): { type: TodoType; done: boolean; description: string } {
    const m = this.META_RE.exec(raw);
    if (!m) {
      return { type: 'blue', done: false, description: raw };
    }
    return {
      type: m[1] as TodoType,
      done: m[2] === '1',
      description: raw.replace(this.META_RE, ''),
    };
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  private toIsoDate(d: Date): string {
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${y}-${mo}-${da}`;
  }

  /** Aus einem ISO-String oder Date das YYYY-MM-DD ziehen. */
  private extractIsoDate(value: string | Date | null | undefined): string {
    if (!value) return this.toIsoDate(new Date());
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return this.toIsoDate(new Date());
    return this.toIsoDate(d);
  }

  /** Aus einem ISO-String/Date HH:mm ziehen (oder '' wenn 00:00). */
  private extractIsoTime(value: string | Date | null | undefined): string {
    if (!value) return '';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '';
    const h = d.getHours();
    const m = d.getMinutes();
    if (h === 0 && m === 0) return '';
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
}
