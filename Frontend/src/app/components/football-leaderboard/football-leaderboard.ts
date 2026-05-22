import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Standing } from '../../services/models';
import { FootballLeaderboardCardComponent } from '../football-leaderboard-card/football-leaderboard-card';

/**
 * Komplette Standings-Tabelle (Premier League).
 * Erwartet eine Liste von Standing-Objekten als Input.
 */
@Component({
  selector: 'app-football-leaderboard',
  standalone: true,
  imports: [CommonModule, FootballLeaderboardCardComponent],
  templateUrl: './football-leaderboard.html',
  styleUrl: './football-leaderboard.css'
})
export class FootballLeaderboardComponent {
  @Input() standings: Standing[] = [];
  @Input() title = 'Premier League';
}
