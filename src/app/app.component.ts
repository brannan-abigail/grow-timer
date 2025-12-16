import { Component, ViewChild } from '@angular/core';
import { signal } from '@angular/core';
import { interval } from 'rxjs';
import { GrowTimerComponent } from '../grow-timer/grow-timer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [GrowTimerComponent, MatFormFieldModule, MatSelectModule, MatOptionModule, MatIconModule, MatButtonModule]
})

export class AppComponent {
  // Plot selection
  // plots = ["Work", "Upskill", "Care Task"];
  // selectedPlot = signal(this.plots[0]);

  // @ViewChild(GrowTimerComponent)
  // timerComponent: GrowTimerComponent;

  // onSelectPlot(plot: string) {
  //   this.selectedPlot.set(plot);
  // }

  // onSkip() now handled in grow-timer

  // onMarkComplete() {
  //   // TODO: Implement mark complete logic
  //   console.log('Mark Complete clicked');
  // }
}
