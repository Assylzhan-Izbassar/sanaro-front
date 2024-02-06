import { Component, Inject } from '@angular/core';
import { GREETING_DATA, Greeting } from '../../models/greeting.model';
import { DialogService } from '../../services/dialog/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  state,
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-greeting-dialog',
  templateUrl: './greeting-dialog.component.html',
  styleUrls: ['./greeting-dialog.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'middle',
        style({
          transform: 'translateX(100%)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('in => out', animate('500ms ease-in-out')),
      transition('middle => in', animate('500ms ease-in-out')),
    ]),
  ],
})
export class GreetingDialogComponent {
  currDataIdx: number = 0;
  greetings: Greeting[] = [];
  slideState: 'in' | 'middle' | 'out' = 'in';

  constructor(
    private dialog: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.greetings = GREETING_DATA;

    if (data.currIndex) {
      this.currDataIdx = data.currIndex;
    }
  }

  onNext() {
    if (this.currDataIdx + 1 < this.greetings.length - 1) {
      this.slideState = 'out';

      setTimeout(() => {
        this.slideState = 'middle';
      }, 500);

      setTimeout(() => {
        // Trigger the animation
        this.slideState = 'in';
        this.currDataIdx++;
      }, 500);
    } else if (this.currDataIdx == this.greetings.length - 1) {
      this.dialog.closeDialog();
      setTimeout(() => {
        this.dialog.openAuthDialog({});
      }, 100);
    } else {
      this.dialog.closeDialog();
      setTimeout(() => {
        this.dialog.openQuestionnaireDialog({});
      }, 100);
    }
  }
}
