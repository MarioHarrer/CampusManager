import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../services/models';

/**
 * Match-Card — zeigt ein einzelnes Spiel (live, angesetzt oder beendet).
 */
@Component({
  selector: 'app-football-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './football-view.html',
  styleUrl: './football-view.css'
})
export class FootballViewComponent {
  @Input({ required: true }) match!: Match;

  get statusLabel(): string {
    if (this.match.status === 'LIVE') return `LIVE · ${this.match.minute ?? 0}'`;
    if (this.match.status === 'FINISHED') return 'Full Time';
    return this.formatTime(this.match.date);
  }

  get isLive(): boolean {
    return this.match.status === 'LIVE';
  }

  get isFinished(): boolean {
    return this.match.status === 'FINISHED';
  }

  private formatTime(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  }
}
