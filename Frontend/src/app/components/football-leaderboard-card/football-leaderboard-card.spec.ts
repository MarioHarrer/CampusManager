import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballLeaderboardCard } from './football-leaderboard-card';

describe('FootballLeaderboardCard', () => {
  let component: FootballLeaderboardCard;
  let fixture: ComponentFixture<FootballLeaderboardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballLeaderboardCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballLeaderboardCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
