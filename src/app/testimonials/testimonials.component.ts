import { Component, OnInit } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';
import { TestimonialsService } from '../services/testimonials/testimonials.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];

  constructor(private service: TestimonialsService) {}

  ngOnInit(): void {
    this.fetchTestimonials();
  }

  private fetchTestimonials(): void {
    this.service.getTestimonials().subscribe(
      (data) => {
        this.testimonials = data;
      },
      (error) => {
        console.error('Error fetching testimonials: ', error);
        this.testimonials = [
          new Testimonial({
            content:
              'FitLine skin Activize Serum, это энергетический бум для моей кожи 🔥. Когда я его попробовала в первые, Я была в восторге, результат был заметен сразу 🤩.',
            user_name: 'Anastasiaaa',
            user_description: '',
            user_avatar: '',
          }),
          new Testimonial({
            content:
              'Продукция FitLine одна из самых лучших. Раньше я постоянно мучился от головной боли, но после приема продукта Aktivize, все боли как рукой сняло. Теперь не могу жить без него.',
            user_name: 'Ким Владимир',
            user_description: '',
            user_avatar: '',
          }),
          new Testimonial({
            content:
              'Принимаю ресторейт перед сном С каждым приемом сон становился лучше, спустя 6 дней заснула мгновенно и сон длился по норме 8 часов. Нервы успокоились за неделю',
            user_name: 'adina484',
            user_description: '',
            user_avatar: '',
          }),
        ];
      }
    );
  }
}
