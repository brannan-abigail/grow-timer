import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GrowTimerComponent } from '../grow-timer/grow-timer';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Basic test suite for GrowTimerComponent

describe('GrowTimerComponent', () => {
  let component: GrowTimerComponent;
  let fixture: ComponentFixture<GrowTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowTimerComponent, NoopAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(GrowTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to Focus mode and paused', () => {
    expect(component.mode).toBe('Focus');
    expect(component.paused).toBeTrue();
  });

  it('should switch to Rest mode on skip', () => {
    component.onSkip();
    expect(component.mode).toBe('Rest');
  });

  it('should toggle paused state on pause/resume', () => {
    expect(component.paused).toBeTrue();
    component.onPauseResume();
    expect(component.paused).toBeFalse();
    component.onPauseResume();
    expect(component.paused).toBeTrue();
  });

  it('should enter and exit edit mode', () => {
    expect(component.editMode).toBeFalse();
    component.onEditClick();
    expect(component.editMode).toBeTrue();
    component.onCancelEdit();
    expect(component.editMode).toBeFalse();
  });

  it('should set correct default times for Focus and Rest', () => {
    component.mode = 'Focus';
    component.setDefaultTimeFromMode();
    expect(component.countdownMinutes).toBe(45);
    expect(component.countdownSeconds).toBe(0);
    component.mode = 'Rest';
    component.setDefaultTimeFromMode();
    expect(component.countdownMinutes).toBe(15);
    expect(component.countdownSeconds).toBe(0);
  });

  it('should update countdown time when inputs change', () => {
    component.countdownMinutes = 1;
    component.countdownSeconds = 30;
    component.updateCountdownTime();
    expect(component.timeDifference).toBeGreaterThan(0);
  });

  it('should allocate time units correctly', () => {
    // 2 minutes, 10 seconds
    const ms = (2 * 60 + 10) * 1000;
    component.allocateTimeUnits(ms);
    expect(component.minutesToCountdownTime).toBe(2);
    expect(component.secondsToCountdownTime).toBe(10);
  });
});
