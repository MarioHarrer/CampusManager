// ---------------------------------------------------------------------------
// Zentrale UI-Modelle für das Frontend.
// Diese Typen sind das, womit die Components arbeiten (Calendar, Home, Edit
// usw.). Das Mapping auf die Backend-Entitäten passiert im TodoService.
// ---------------------------------------------------------------------------

/** Farb-/Kategorie-Typ eines ToDos (für die farbigen Pills im UI). */
export type TodoType = 'blue' | 'orange' | 'red' | 'green';

/**
 * UI-Repräsentation eines ToDos.
 * Achtung: Felder wie `type` und `done` existieren so im Backend nicht und
 * werden im TodoService aus/in die Backend-Felder gemappt (Konvention:
 * `description` hält die Metadaten "type=…; done=…" als Prefix).
 */
export interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:mm  (leer = ohne Uhrzeit)
  type: TodoType;
  done: boolean;
}

/** Was die Komponenten beim Erstellen eines ToDos schicken. */
export interface CreateTodo {
  title: string;
  description: string;
  date: string;
  time: string;
  type: TodoType;
}

/** Was die Komponenten beim Bearbeiten schicken (alle Felder optional). */
export type UpdateTodo = Partial<CreateTodo> & { done?: boolean };

// ---------------------------------------------------------------------------
// Football
// ---------------------------------------------------------------------------

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED';
export type MatchResult = 'W' | 'D' | 'L';

export interface MatchTeam {
  name: string;
  crest: string;            // Emoji / Kürzel
  score: number | null;     // null = noch nicht gespielt
}

export interface Match {
  id: string;
  competition: string;
  date: string;             // ISO-Datum/Zeit
  status: MatchStatus;
  minute?: number;          // bei LIVE
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
}

export interface Standing {
  position: number;
  team: string;
  crest: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDiff: number;
  points: number;
  lastFive: MatchResult[];
}

// ---------------------------------------------------------------------------
// Weather
// ---------------------------------------------------------------------------

export interface Weather {
  temperature: number;
  feelsLike: number;
  condition: string;
  icon: string;             // Emoji
  locationName: string;
  windSpeed: number;
  humidity: number;
  updatedAt: string;        // ISO
}
