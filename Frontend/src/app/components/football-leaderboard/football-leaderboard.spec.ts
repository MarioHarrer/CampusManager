import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FootballLeaderboardComponent } from './football-leaderboard';

describe('FootballLeaderboardComponent', () => {
  let component: FootballLeaderboardComponent;
  let fixture: ComponentFixture<FootballLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballLeaderboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballLeaderboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
