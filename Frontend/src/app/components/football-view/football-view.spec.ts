import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballView } from './football-view';

describe('FootballView', () => {
  let component: FootballView;
  let fixture: ComponentFixture<FootballView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
