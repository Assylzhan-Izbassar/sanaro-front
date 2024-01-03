import { Component } from '@angular/core';
import { Objection, objections as obj } from '../models/objection.model';
import {
  animate,
  transition,
  trigger,
  state,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-handle-obj',
  templateUrl: './handle-obj.component.html',
  styleUrls: ['./handle-obj.component.css'],
  animations: [
    trigger('answerAnimation', [
      state('answer_visible', style({ maxHeight: '500px' })),
      state('answer_hidden', style({ maxHeight: '0px' })),
      transition(
        'answer_visible <=> answer_hidden',
        animate('800ms ease-in-out')
      ),
    ]),
    trigger('arrowAnimation', [
      state('arrow_left', style({ transform: 'rotate(0deg)' })),
      state('arrow_bottom', style({ transform: 'rotate(90deg)' })),
      transition('arrow_left <=> arrow_bottom', animate('800ms ease-in-out')),
    ]),
  ],
})
export class HandleObjComponent {
  objections: Objection[] = obj;
  items: NodeListOf<Element> | undefined;

  ngAfterViewInit() {
    this.items = document.querySelectorAll('.handle__item');
  }

  questionDropdown(objection: Objection) {
    objection.answerVisible = !objection.answerVisible;
  }
}
