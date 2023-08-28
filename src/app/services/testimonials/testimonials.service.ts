import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Testimonial, TestimonialData } from 'src/app/models/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  private _apiUrl: string = environment.apiUrl;
  private _url: string = `${this.apiUrl}/content_management/testimonials/`

  // getter for apiUrl
  public get apiUrl(): string {
    return this._apiUrl;
  }

  // getter for url
  public get url(): string {
    return this._url;
  }

  constructor(private http: HttpClient) {}

  // GET request
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<TestimonialData[]>(this.url).pipe(
      map((response: any[]) => {
        return response.map(item => new Testimonial(item));
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
