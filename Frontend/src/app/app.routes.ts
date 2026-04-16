import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CalenderComponent } from './pages/calender/calender';
import { FootballComponent } from './pages/football/football';
// Importiere die Unterkomponenten für den Kalender (aus image_1.png)
import { CreateTodoComponent } from './components/create-todo/create-todo';
import { EditTodoComponent } from './components/edit-todo/edit-todo';

export const routes: Routes = [
  // Hauptrouten (für die Navbar)
  { path: 'home', component: HomeComponent },
  { path: 'football', component: FootballComponent },
  {
    path: 'calender',
    component: CalenderComponent,
    children: [
      // Unterrouten für Todos (aus image_1.png Struktur)
      // '/calender' zeigt standardmäßig die Kalenderansicht (die in calender.ts definiert ist)
      { path: 'create', component: CreateTodoComponent },
      { path: 'edit/:id', component: EditTodoComponent } // :id ist ein Platzhalter
    ]
  },

  // Standard- und Catch-All Routen
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Leere URL leitet auf Home weiter
  { path: '**', redirectTo: 'home' } // Unbekannte URLs leiten auf Home weiter
];
