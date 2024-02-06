import { Component } from '@angular/core';
import { Objection, objections as obj } from '../../models/objection.model';

@Component({
  selector: 'app-handle-obj',
  templateUrl: './handle-obj.component.html',
  styleUrls: ['./handle-obj.component.css'],
})
export class HandleObjComponent {
  objections: Objection[] = obj;

  onSelectedQuestion(idx: number) {
    const questions = document.querySelectorAll('.objections__item');
    if (questions) {
      const selected = questions[idx];
      const arrow = selected.firstChild?.lastChild;
      const answer = selected.lastChild;

      if (arrow && answer) {
        (arrow as HTMLElement).classList.toggle('_active');
        (answer as HTMLElement).classList.toggle('_active');
      }
    }
  }
}
