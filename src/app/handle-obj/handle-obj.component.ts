import { Component } from '@angular/core';
import { Objection } from '../models/objection.model';
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
  objections: Objection[] = [
    new Objection(
      'Как понять, что человеку необходимо начать принимать продукты дополнительного питания FitLine?',
      `Если вы чувствуете:
      • усталость, снижение работоспособности
      • раздражительность
      • сонливость или бессонницу
      • апатию и отсутствие радости жизни
      • депрессию или плохое настроение
      • повышенную тягу к сладкому, мучному, кислому, соленому, алкоголю и др.
      Значит, пора всерьез подумать о коррекции своего питания с помощью продуктов дополнительного питания, так как 80% нашего здоровья обеспечивается правильным сбалансированным питанием.`
    ),
    new Objection(
      'Возникает ли привыкание к продуктам FitLine?',
      `Привыкание или зависимость – это состояние, когда организм перестает синте- зировать какие-то важные вещества при введении их в течение некоторого вре- мени извне (например, в виде синтетических препаратов с лечебными целями, как всем известный инсулин). Соответственно, при отмене такого препарата в организме возникает дефицит собственных веществ, что и проявляется эффек- тами зависимости. Однако биологически активные вещества пищи, которые и являются компонентами FitLine, по своей природе вообще НЕ синтезируются в нашем организме. Именно поэтому мы и должны получать их постоянно с пищей. И именно поэтому привыкания или зависимости не может быть по определению. Можно сказать проще, и ответить вопросом на вопрос – возникает ли привыка- ние к салату? К фруктам? К еде?`
    ),
    new Objection(
      'Можно ли заменить продукты FitLine обычной пищей?',
      `Комплексы FitLine – это компоненты пищи. Поэтому, конечно, все они могут быть получены в виде пищевых источников. И именно так и было на протяжении нашей эволюции. Однако доступная нам сегодня замороженная, термически обработанная, рафинированная, культивированная или генетически модифицированная пища содержит все меньше и меньше биологически активных веществ. А специальная органическая пища малодоступна как физически, так и особенно из-за своей дороговизны. Поэтому FitLine являются наиболее доступным, концентрированным и наиболее дешевым источником незаменимых биологически активных веществ.`
    ),
    new Objection(
      'Каковы условия гарантии на продукцию FitLine и политика возврата?',
      `Мы гордимся качеством нашей продукции FitLine и уверены в ее эффективности. Мы предоставляем гарантию на наши продукты, что позволяет нашим клиентам попробовать продукцию без риска. Если вы не полностью удовлетворены результатами, вы можете воспользоваться нашей политикой возврата. Обратите внимание, что сроки и условия гарантии и возврата могут варьироваться в зависимости от продукта и местоположения. Наша цель - обеспечить полное удовлетворение клиентов, поэтому мы делаем все возможное, чтобы обеспечить прозрачность и удобство в этом процессе.`
    ),
    new Objection(
      'Как осуществляется доставка продуктов FitLine по Казахстану?',
      `Мы рады предоставить доставку продуктов FitLine по всему Казахстану. Пожалуйста, обратите внимание, что стоимость доставки может отличаться в зависимости от города. Например, в городе Алматы средняя стоимость доставки составляет 1500 тенге. Мы стремимся обеспечить удобство для наших клиентов, предоставляя быструю и надежную доставку в любую точку страны.`
    ),
  ];
  items: NodeListOf<Element> | undefined;

  ngAfterViewInit() {
    this.items = document.querySelectorAll('.handle__item');
  }

  questionDropdown(objection: Objection) {
    objection.answerVisible = !objection.answerVisible;
  }
}
