import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Question, QuestionData } from 'src/app/models/question.model';
import { BaseService } from '../core/base.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService extends BaseService {
  private _url: string = `${this.apiUrl}/content_management/questions/`;
  // getter for url
  public get url(): string {
    return this._url;
  }

  getQuestions(): Observable<QuestionData[]> {
    return this.http.get<QuestionData[]>(this.url);
  }
}
