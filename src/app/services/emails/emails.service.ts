import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Observable } from 'rxjs';
import { EmailData } from 'src/app/models/email.model';

@Injectable({
  providedIn: 'root',
})
export class EmailsService extends BaseService {
  private readonly url: string = `${this.apiUrl}/lead_generation/`;

  /**
   * Method that creates email tracking and sends email to the client.
   * @param data - EmailsData that have just email field.
   * @returns - Response of the POST request.
   */
  postEmailTracking(data: EmailData): Observable<any> {
    let url = this.url + 'email_trackings/';
    return this.http.post(url, data);
  }

  /**
   * Method to create email newsletter for the client.
   * @param data - EmailsData that have just email field.
   * @returns - Response of the POST request.
   */
  postEmailNewsletters(data: EmailData): Observable<any> {
    let url = this.url + 'email_newsletters/';
    return this.http.post(url, data);
  }
}
