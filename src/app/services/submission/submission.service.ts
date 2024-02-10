import { SubmissionData } from './../../models/submission.model';
import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService extends BaseService {
  private _url: string = `${this.apiUrl}/content_management/submissions/`;

  /**
   * Getter for url parameter.
   */
  public get url(): string {
    return this._url;
  }

  /**
   * Method for creating submission data in database.
   * @param data - SubmissionData parameter.
   * @returns
   */
  postSubmission(data: SubmissionData): Observable<SubmissionData> {
    return this.http.post<SubmissionData>(this.url, data);
  }
}
