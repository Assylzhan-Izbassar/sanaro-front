import { Component, OnInit } from '@angular/core';
import { Testimonial, TestimonialData } from '../models/testimonial.model';
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
        console.log('Testimonials is fetched');
      },
      (error) => {
        console.error('Error fetching testimonials: ', error);
      }
    );
  }
}
