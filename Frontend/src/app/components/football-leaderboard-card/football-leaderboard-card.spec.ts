import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FootballLeaderboardCardComponent } from './football-leaderboard-card';

describe('FootballLeaderboardCardComponent', () => {
  let component: FootballLeaderboardCardComponent;
  let fixture: ComponentFixture<FootballLeaderboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballLeaderboardCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballLeaderboardCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
