import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '../../services/football.service';
import { FootballLeaderboardComponent } from '../../components/football-leaderboard/football-leaderboard';
import { FootballViewComponent } from '../../components/football-view/football-view';

@Component({
  selector: 'app-football',
  standalone: true,
  imports: [CommonModule, FootballLeaderboardComponent, FootballViewComponent],
  templateUrl: './football.html',
  styleUrl: './football.css'
})
export class FootballComponent {
  private footballService = inject(FootballService);

  standings     = this.footballService.standings;
  todayMatches  = this.footballService.todayMatches;
  recentMatches = this.footballService.recentMatches;

  activeTab: 'today' | 'recent' = 'today';

  setTab(tab: 'today' | 'recent') {
    this.activeTab = tab;
  }
}
