import { Subscription, interval } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    // styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
 private subscription: Subscription;

  public countdownMin = 25; // TODO: take as input
  public dateNow = new Date();
  private currentTime = this.dateNow.getTime();
  private minutesToAdd = this.countdownMin * 10000;
  public countdownTime = new Date(this.currentTime + this.minutesToAdd);

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
