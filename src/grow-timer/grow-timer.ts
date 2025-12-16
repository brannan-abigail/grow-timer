import { Subscription, interval } from 'rxjs';
import { Component, OnInit, OnDestroy, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-grow-timer',
    standalone: true,
    templateUrl: './grow-timer.html',
    styleUrls: ['./grow-timer.scss'],
    imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule]
})
export class GrowTimerComponent implements OnInit, OnDestroy {
    @HostBinding('class.focus-host') get isFocus() { return this.mode === 'Focus'; }
    @HostBinding('class.rest-host') get isRest() { return this.mode === 'Rest'; }

    // Focus/Rest mode
    modes = ["Focus", "Rest"];
    mode = this.modes[0];
    paused: boolean = true;
    @Output() pauseResume = new EventEmitter<void>();

    onSkip() {
        this.mode = this.mode === 'Focus' ? 'Rest' : 'Focus';
        this.setDefaultTimeFromMode();
        this.updateCountdownTime();
    }

    // Pause/Resume logic
    onPauseResume() {
        if (this.paused) {
            this.startTimer();
            this.paused = false;
        } else {
            this.pauseTimer();
            this.paused = true;
        }
    }

    private startTimer() {
        if (!this.subscription) {
            this.subscription = interval(1000)
                .subscribe(() => { this.getTimeDifference(); });
        }
    }

    private pauseTimer() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    // Edit mode functionality
    public onCancelEdit() {
        this.editMode = false;
    }
    public onEditClick() {
        this.editMode = true;
    }
    public editMode = false;
    private subscription: Subscription;

    // new separate inputs for minutes / seconds
    public countdownMinutes = 25;
    public countdownSeconds = 0;

    public dateNow = new Date();
    private currentTime = this.dateNow.getTime();

    // countdownTime will be recalculated from minutes/seconds
    private countdownTime: Date;

    milliSecondsInASecond = 1000;
    minutesInAnHour = 60;
    SecondsInAMinute = 60;

    public timeDifference;
    public secondsToCountdownTime;
    public minutesToCountdownTime;

    // compute total milliseconds from M:S inputs
    private getTotalMillisecondsFromInputs(): number {
        const m = Number(this.countdownMinutes) || 0;
        const s = Number(this.countdownSeconds) || 0;
        return ((m * 60) + s) * this.milliSecondsInASecond;
    }

    // update countdownTime based on inputs and compute initial difference
    public updateCountdownTime() {
        this.currentTime = new Date().getTime();
        const msToAdd = this.getTotalMillisecondsFromInputs();
        this.countdownTime = new Date(this.currentTime + msToAdd);
        this.getTimeDifference();
    }

    private getTimeDifference() {
        // ensure countdownTime exists (e.g. on init)
        if (!this.countdownTime) {
            this.updateCountdownTime();
        }
        this.timeDifference = this.countdownTime.getTime() - new Date().getTime();
        this.allocateTimeUnits(this.timeDifference);
    }

    private allocateTimeUnits(timeDifference) {
        this.secondsToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.SecondsInAMinute) % this.minutesInAnHour);
    }

    ngOnInit() {
        // Set default time based on mode
        this.setDefaultTimeFromMode();
        this.updateCountdownTime();
        // Start paused: do not start interval
    }

    setDefaultTimeFromMode() {
        if (this.mode === 'Focus') {
            this.countdownMinutes = 45;
            this.countdownSeconds = 0;
        } else if (this.mode === 'Rest') {
            this.countdownMinutes = 15;
            this.countdownSeconds = 0;
        }
    }

    ngOnDestroy() {
        this.pauseTimer();
    }
}
