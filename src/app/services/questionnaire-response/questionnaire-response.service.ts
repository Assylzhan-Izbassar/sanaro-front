import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { QuestionnaireResponseData } from 'src/app/models/questionnaire-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireResponseService extends BaseService {
  private _url: string = `${this.apiUrl}/content_management/questionnaire_response`;
  // getter for url
  public get url(): string {
    return this._url;
  }

  /**
   * Creates item of questionnaire response in database.
   * @param data - Questionnaire response data.
   * @returns
   */
  postQuestionnaireResponse(data: QuestionnaireResponseData): Observable<any> {
    return this.http.post(this.url, data);
  }

  /**
   * Creates async QuestionnaireResponse items by passing array.
   * @param data - Array of QuestionnaireResponseData.
   * @returns
   */
  createQuestionnaireResponses(
    data: QuestionnaireResponseData[]
  ): Observable<any> {
    return this.http.post(`${this.url}/create_list/`, data);
  }
}
