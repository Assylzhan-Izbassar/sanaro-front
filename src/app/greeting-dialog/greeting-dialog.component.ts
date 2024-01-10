import { Component, Inject } from '@angular/core';
import { GREETING_DATA, Greeting } from '../models/greeting.model';
import { DialogService } from '../services/dialog/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  state,
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AuthService } from '../services/auth/auth.service';

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
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fillName(GREETING_DATA[0].title).then((result: string) => {
      GREETING_DATA[0].title = result;
    });
    this.greetings = GREETING_DATA;

    if (data.currIndex) {
      this.currDataIdx = data.currIndex;
    }
  }

  private async fillName(title: string): Promise<string> {
    try {
      const response = await this.authService.getCurrentUserInfo();
      let username = response?.username;
      title = title.replace('{{username}}', username!);
    } catch (error) {
      console.log(error);
    }
    return title;
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
