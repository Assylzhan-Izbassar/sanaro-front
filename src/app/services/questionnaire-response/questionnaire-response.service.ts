import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { QuestionnaireResponseData } from 'src/app/models/questionnaire-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireResponseService extends BaseService {
  private readonly url: string = `${this.apiUrl}/content_management/questionnaire_response`;

  private _data: QuestionnaireResponseData[] = [];
  public get data() {
    return this._data;
  }
  public set data(value: QuestionnaireResponseData[]) {
    this._data = value;
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
   * Call the method for the backend to store earlier saved questionnaire responses.
   * @param userId - Identification number of the user
   * @returns
   */
  postQuestionnaireResponses(userId: number): boolean {
    let result = true;
    if (userId && this.data) {
      for (let questionnaireResponse of this.data) {
        questionnaireResponse.user = userId;
      }
      this.createQuestionnaireResponses(this.data).subscribe({
        next: (response) => {
          return true;
        },
        error: (e) => {
          setTimeout(() => {
            result = false;
          }, 300);
          console.log(e);
        },
      });
    }
    return result;
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
