import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { QuestionnaireResponseData } from 'src/app/models/questionnaire-response.model';
import { HttpErrorResponse } from '@angular/common/http';

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
  postQuestionnaireResponse(data: QuestionnaireResponseData): boolean {
    this.http.post(this.url, data).subscribe(
      (response) => {
        return true;
      },
      (error) => {
        this.handleError(error);
      }
    );
    return false;
  }

  /**
   * Creates async QuestionnaireResponse items by passing array.
   * @param data - Array of QuestionnaireResponseData.
   * @returns
   */
  async createQuestionnaireResponses(
    data: QuestionnaireResponseData[]
  ): Promise<boolean> {
    try {
      const response = await this.http
        .post(`${this.url}/create_list/`, data)
        .toPromise();
      if (response) {
        return true;
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.handleError(error);
      }
    }
    return false;
  }
}
