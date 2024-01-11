import { Component } from '@angular/core';
import { Objection, objections as obj } from '../models/objection.model';

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

    // console.log(el);
    // const parentElem = (el as HTMLElement).parentElement;

    // if (parentElem) {
    //   const ansElem = parentElem.nextSibling as HTMLElement;
    //   const spanElem = parentElem.lastChild as HTMLElement;

    //   console.log(ansElem);
    //   console.log(spanElem);

    //   if (ansElem && spanElem) {
    //     if (spanElem.classList.contains('_active')) {
    //       spanElem.classList.remove('_active');
    //     } else {
    //       spanElem.classList.add('_active');
    //     }
    //     if (ansElem.classList.contains('_active')) {
    //       ansElem.classList.remove('_active');
    //     } else {
    //       ansElem.classList.add('_active');
    //     }
    //   }
    // }
  }
}
