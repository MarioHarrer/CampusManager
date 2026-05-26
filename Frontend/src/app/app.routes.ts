import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CalenderComponent } from './pages/calender/calender';
import { FootballComponent } from './pages/football/football';
import { CreateTodoComponent } from './components/create-todo/create-todo';
import { EditTodoComponent } from './components/edit-todo/edit-todo';
import {authGuard} from './auth-guard';

export const routes: Routes = [
  // Hauptrouten (für die Navbar)
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'football', component: FootballComponent , canActivate: [authGuard]},
  {
    path: 'calender',
    component: CalenderComponent,
    children: [

      { path: 'create', component: CreateTodoComponent },
      { path: 'edit/:id', component: EditTodoComponent }
    ], canActivate: [authGuard]
  },

  // Standard- und Catch-All Routen
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
