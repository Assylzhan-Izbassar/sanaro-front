import { Component, OnInit } from '@angular/core';
import { Testimonial, testimonials as tes } from '../../models/testimonial.model';
import { TestimonialsService } from '../../services/testimonials/testimonials.service';

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
        this.testimonials = tes;
      }
    );
  }
}
