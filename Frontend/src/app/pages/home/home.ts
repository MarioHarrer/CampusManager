import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // WICHTIG: Das hier hat gefehlt!

@Component({
  selector: 'app-home',
  standalone: true,
  // Wir fügen CommonModule hinzu, damit *ngFor funktioniert
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
