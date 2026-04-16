import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballLeaderboard } from './football-leaderboard';

describe('FootballLeaderboard', () => {
  let component: FootballLeaderboard;
  let fixture: ComponentFixture<FootballLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballLeaderboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballLeaderboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
