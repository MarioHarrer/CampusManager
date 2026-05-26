import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataPickerComponent } from './data-picker';

describe('DataPickerComponent', () => {
  let component: DataPickerComponent;
  let fixture: ComponentFixture<DataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DataPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
