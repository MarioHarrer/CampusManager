import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FootballComponent } from './football';

describe('FootballComponent', () => {
  let component: FootballComponent;
  let fixture: ComponentFixture<FootballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
