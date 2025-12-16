import { Subscription, interval } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'app-grow-timer',
    standalone: true,
    templateUrl: './grow-timer.html',
    styleUrls: ['./grow-timer.scss'],
    imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule]
})
export class GrowTimerComponent implements OnInit, OnDestroy {
    public onCancelEdit() {
        this.editMode = false;
    }
    public onEditClick() {
        this.editMode = true;
    }
    public editMode = false;
 private subscription: Subscription;

 // new separate inputs for hours / minutes / seconds
 public countdownHours = 0;
 public countdownMinutes = 25;
 public countdownSeconds = 0;

 public dateNow = new Date();
 private currentTime = this.dateNow.getTime();

 // countdownTime will be recalculated from hours/minutes/seconds
 private countdownTime: Date;

 milliSecondsInASecond = 1000;
 hoursInADay = 24;
 minutesInAnHour = 60;
 SecondsInAMinute  = 60;

 public timeDifference;
 public secondsToCountdownTime;
 public minutesToCountdownTime;
 public hoursToCountdownTime;

 // compute total milliseconds from H:M:S inputs
 private getTotalMillisecondsFromInputs(): number {
     const h = Number(this.countdownHours) || 0;
     const m = Number(this.countdownMinutes) || 0;
     const s = Number(this.countdownSeconds) || 0;
     return ((h * 3600) + (m * 60) + s) * this.milliSecondsInASecond;
 }

 // update countdownTime based on inputs and compute initial difference
 public updateCountdownTime() {
     this.currentTime = new Date().getTime();
     const msToAdd = this.getTotalMillisecondsFromInputs();
     this.countdownTime = new Date(this.currentTime + msToAdd);
     this.getTimeDifference();
 }

 private getTimeDifference () {
     // ensure countdownTime exists (e.g. on init)
     if (!this.countdownTime) {
         this.updateCountdownTime();
     }
     this.timeDifference = this.countdownTime.getTime() - new Date().getTime();
     this.allocateTimeUnits(this.timeDifference);
 }

 private allocateTimeUnits (timeDifference) {
     this.secondsToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
     this.minutesToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.SecondsInAMinute) % this.minutesInAnHour);
     this.hoursToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.SecondsInAMinute * this.minutesInAnHour) % this.hoursInADay);
 }

 ngOnInit() {
     // initialize countdownTime from inputs
     this.updateCountdownTime();

     this.subscription = interval(1000)
         .subscribe(() => { this.getTimeDifference(); });
 }

 ngOnDestroy() {
   this.subscription.unsubscribe();
 }
}
