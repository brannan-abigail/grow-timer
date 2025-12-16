import { Component } from '@angular/core';
import { GrowTimerComponent } from '../grow-timer/grow-timer';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [GrowTimerComponent]
})
export class AppComponent {
  // AppComponent logic (if any) goes here
}
