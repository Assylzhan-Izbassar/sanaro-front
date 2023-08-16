import { Component } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    new Testimonial(
      'FitLine skin Activize Serum, это энергетический бум для моей кожи 🔥. Когда я его попробовала в первые, Я была в восторге, результат был заметен сразу 🤩.',
      'Anastasiaaa',
      '../../assets/testimonials/default-img.svg'
    ),
    new Testimonial(
      'Продукция FitLine одна из самых лучших. Раньше я постоянно мучился от головной боли, но после приема продукта Aktivize, все боли как рукой сняло. Теперь не могу жить без него.',
      'Ким Владимир',
      '../../assets/testimonials/default-img.svg'
    ),
    new Testimonial(
      'Принимаю ресторейт перед сном С каждым приемом сон становился лучше, спустя 6 дней заснула мгновенно и сон длился по норме 8 часов. Нервы успокоились за неделю',
      'adina484',
      '../../assets/testimonials/default-img.svg'
    ),
  ];
}
