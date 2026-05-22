import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Standing } from '../../services/models';

/**
 * Einzelne Zeile der Standings-Tabelle (eine Zeile = ein Team).
 */
@Component({
  selector: 'app-football-leaderboard-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './football-leaderboard-card.html',
  styleUrl: './football-leaderboard-card.css'
})
export class FootballLeaderboardCardComponent {
  @Input({ required: true }) standing!: Standing;
}
