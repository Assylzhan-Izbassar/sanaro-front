import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Testimonial, TestimonialData } from 'src/app/models/testimonial.model';
import { BaseService } from '../core/base.service';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService extends BaseService {

  private _url: string = `${this.apiUrl}/content_management/testimonials/`;
  // getter for url
  public get url(): string {
    return this._url;
  }

  // GET request
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<TestimonialData[]>(this.url).pipe(
      map((response: any[]) => {
        return response.map((item) => new Testimonial(item));
      }),
      catchError(super.handleError),
    );
  }
}
