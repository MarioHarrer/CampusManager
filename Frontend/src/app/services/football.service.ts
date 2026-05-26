import { Injectable, signal } from '@angular/core';
import { Match, Standing } from './models';

/**
 * Football-Service mit lokalen Mock-Daten.
 *
 * Im Backend (Campus Manager) gibt es aktuell keinen Endpoint für Fußball-
 * Daten. Damit die Football-Seite trotzdem das Original-UI zeigen kann,
 * stellen wir hier statische Beispieldaten als Signals bereit.
 *
 * Sobald es im Backend (oder einer externen API) entsprechende Endpoints
 * gibt, kann diese Klasse einfach um HTTP-Calls erweitert werden — die
 * Components müssen nicht geändert werden, da sie nur die Signals lesen.
 */
@Injectable({ providedIn: 'root' })
export class FootballService {
  private readonly _standings = signal<Standing[]>(SAMPLE_STANDINGS);
  private readonly _todayMatches = signal<Match[]>(SAMPLE_TODAY);
  private readonly _recentMatches = signal<Match[]>(SAMPLE_RECENT);

  readonly standings = this._standings.asReadonly();
  readonly todayMatches = this._todayMatches.asReadonly();
  readonly recentMatches = this._recentMatches.asReadonly();
}

// ---------------------------------------------------------------------------
// Beispiel-Daten
// ---------------------------------------------------------------------------

const SAMPLE_STANDINGS: Standing[] = [
  { position: 1,  team: 'Arsenal',         crest: '🔴', played: 12, won: 9, drawn: 2, lost: 1, goalDiff: 18, points: 29, lastFive: ['W','W','D','W','W'] },
  { position: 2,  team: 'Manchester City', crest: '🩵', played: 12, won: 8, drawn: 3, lost: 1, goalDiff: 17, points: 27, lastFive: ['W','D','W','W','D'] },
  { position: 3,  team: 'Liverpool',       crest: '🔴', played: 12, won: 8, drawn: 2, lost: 2, goalDiff: 14, points: 26, lastFive: ['W','W','L','W','W'] },
  { position: 4,  team: 'Aston Villa',     crest: '🟣', played: 12, won: 7, drawn: 3, lost: 2, goalDiff: 10, points: 24, lastFive: ['D','W','W','W','L'] },
  { position: 5,  team: 'Tottenham',       crest: '⚪', played: 12, won: 7, drawn: 2, lost: 3, goalDiff: 8,  points: 23, lastFive: ['W','L','W','W','D'] },
  { position: 6,  team: 'Chelsea',         crest: '🔵', played: 12, won: 6, drawn: 3, lost: 3, goalDiff: 5,  points: 21, lastFive: ['W','W','D','L','W'] },
  { position: 7,  team: 'Newcastle',       crest: '⚫', played: 12, won: 6, drawn: 2, lost: 4, goalDiff: 6,  points: 20, lastFive: ['L','W','W','D','W'] },
  { position: 8,  team: 'Man United',      crest: '🔴', played: 12, won: 5, drawn: 3, lost: 4, goalDiff: 2,  points: 18, lastFive: ['D','W','L','W','D'] },
  { position: 9,  team: 'Brighton',        crest: '🔵', played: 12, won: 5, drawn: 2, lost: 5, goalDiff: 0,  points: 17, lastFive: ['L','W','L','W','W'] },
  { position: 10, team: 'West Ham',        crest: '🟤', played: 12, won: 4, drawn: 4, lost: 4, goalDiff: -2, points: 16, lastFive: ['D','D','W','L','D'] },
];

const todayIso = (h: number, m: number = 0): string => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

const daysAgo = (n: number, h: number = 15): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
};

const SAMPLE_TODAY: Match[] = [
  {
    id: 't1', competition: 'Premier League', date: todayIso(18, 30),
    status: 'LIVE', minute: 62,
    homeTeam: { name: 'Arsenal',   crest: '🔴', score: 2 },
    awayTeam: { name: 'Chelsea',   crest: '🔵', score: 1 },
  },
  {
    id: 't2', competition: 'Premier League', date: todayIso(21, 0),
    status: 'SCHEDULED',
    homeTeam: { name: 'Liverpool', crest: '🔴', score: null },
    awayTeam: { name: 'Man City',  crest: '🩵', score: null },
  },
];

const SAMPLE_RECENT: Match[] = [
  {
    id: 'r1', competition: 'Premier League', date: daysAgo(2),
    status: 'FINISHED',
    homeTeam: { name: 'Tottenham', crest: '⚪', score: 3 },
    awayTeam: { name: 'West Ham',  crest: '🟤', score: 1 },
  },
  {
    id: 'r2', competition: 'Premier League', date: daysAgo(3),
    status: 'FINISHED',
    homeTeam: { name: 'Newcastle',   crest: '⚫', score: 0 },
    awayTeam: { name: 'Aston Villa', crest: '🟣', score: 2 },
  },
  {
    id: 'r3', competition: 'Premier League', date: daysAgo(4),
    status: 'FINISHED',
    homeTeam: { name: 'Brighton',  crest: '🔵', score: 1 },
    awayTeam: { name: 'Man United',crest: '🔴', score: 1 },
  },
];
