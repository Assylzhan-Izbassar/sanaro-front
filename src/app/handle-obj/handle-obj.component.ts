import { Component } from '@angular/core';
import { Objection, objections as obj } from '../models/objection.model';

@Component({
  selector: 'app-handle-obj',
  templateUrl: './handle-obj.component.html',
  styleUrls: ['./handle-obj.component.css'],
})
export class HandleObjComponent {
  objections: Objection[] = obj;

  onSelectedQuestion(el: any) {
    const parentElem = (el as HTMLElement).parentElement;

    if (parentElem) {
      const ansElem = parentElem.nextSibling;
      if (ansElem) {
        (ansElem as HTMLElement).classList.toggle('_active');
        const spanElem = parentElem.lastChild;
        if (spanElem) {
          (spanElem as HTMLElement).classList.toggle('_active');
        }
      }
    }
  }
}
