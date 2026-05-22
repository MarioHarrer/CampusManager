import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FootballViewComponent } from './football-view';

describe('FootballViewComponent', () => {
  let component: FootballViewComponent;
  let fixture: ComponentFixture<FootballViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
