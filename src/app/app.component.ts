import { Subscription, interval } from 'rxjs';
import { Component, OnInit, OnDestroy, input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
    template: ` Countdown Min: {{countdownMin}} `
})
export class AppComponent implements OnInit, OnDestroy {
 private subscription: Subscription;

  public countdownMin = input(25);
  public dateNow = new Date();
  private currentTime = this.dateNow.getTime();
  public minutesToAdd = this.countdownMin() * 60 * 1000; // Number(this.countdownMIn)
  private countdownTime = new Date(this.currentTime + this.minutesToAdd);

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

    public timeDifference;
    public secondsToCountdownTime;
    public minutesToCountdownTime;
    public hoursToCountdownTime;


  private getTimeDifference () {
      this.timeDifference = this.countdownTime.getTime() - new Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
  }

private allocateTimeUnits (timeDifference) {
      this.secondsToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToCountdownTime = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
}

  ngOnInit() {
      this.subscription = interval(1000)
          .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
