import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { QuestionnaireResponseData } from 'src/app/models/questionnaire-response.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireResponseService extends BaseService {
  private _url: string = `${this.apiUrl}/content_management/questionnaire_response/`;
  // getter for url
  public get url(): string {
    return this._url;
  }

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
}
