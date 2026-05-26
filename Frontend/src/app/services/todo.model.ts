// Spiegelt die Backend-Entity in /backend/src/todos/entities/todo.entity.ts
export interface Todo {
  id: string;
  name: string;
  description: string;
  date: string;          // vom Backend kommt ein ISO-String
  startTime?: string;
  endTime?: string;
  userId?: string;
}

// Was wir beim Anlegen schicken (id wird vom Backend generiert)
export interface CreateTodo {
  name: string;
  description: string;
  date: string;
  startTime?: string;
  endTime?: string;
}

export type UpdateTodo = Partial<CreateTodo>;
