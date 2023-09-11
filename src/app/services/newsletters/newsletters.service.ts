import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Observable } from 'rxjs';
import { EmailNewsletterData } from 'src/app/models/email-newsletter.model';

@Injectable({
  providedIn: 'root'
})
export class NewslettersService extends BaseService {
  private readonly url: string = `${this.apiUrl}/lead_generation/email_newsletters/`;

  /**
   * Method to create email newsletter for the client.
   * @param data - EmailNewsletterData that have just email field.
   * @returns - Response of the POST request.
   */
  postEmailNewsletters(data: EmailNewsletterData): Observable<any> {
    return this.http.post(this.url, data);
  }
}
