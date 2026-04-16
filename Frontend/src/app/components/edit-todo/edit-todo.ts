import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.css'
})
export class EditTodoComponent implements OnInit {
  // Dieses Objekt hält die Daten, die wir bearbeiten
  todo: any = {
    title: '',
    description: '',
    date: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1. ID aus der URL holen
    const id = this.route.snapshot.paramMap.get('id');

    // 2. Daten laden (Hier würdest du normalerweise dein Backend fragen)
    // Zur Demo laden wir hier Beispieldaten basierend auf der ID
    this.loadTodo(id);
  }

  loadTodo(id: string | null) {
    // Simulation: Wir finden das To-Do (später via Service)
    console.log('Lade To-Do mit ID:', id);
    this.todo = {
      id: id,
      title: 'Beispiel Aufgabe',
      description: 'Das ist eine geladene Beschreibung',
      date: '2025-10-16'
    };
  }

  saveChanges() {
    // Hier käme der Speicher-Befehl ans Backend
    console.log('Speichere Änderungen:', this.todo);

    // Nach dem Speichern zurück zum Kalender
    this.router.navigate(['/calender']);
  }
}
